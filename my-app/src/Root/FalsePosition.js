import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs';

const FalsePosition = () => {
    const [equation, setEquation] = useState("(x^4) - 13");
    const [XL, setXL] = useState(0);
    const [XR, setXR] = useState(0);
    const [root, setRoot] = useState(null);
    const [data, setData] = useState([]);
    const [html, setHtml] = useState(null);

    const calculateError = (xOld, xNew) => Math.abs((xNew - xOld) / xNew) * 100;

    const calculateFalsePosition = (xl, xr) => {
        let iter = 0;
        const MAX_ITER = 50;
        const epsilon = 0.00001;
        let xm = 0, fXl = 0, fXr = 0, fXm = 0, ea = 100;

        let results = [];

        while (ea > epsilon && iter < MAX_ITER) {
            fXl = evaluate(equation, { x: xl });
            fXr = evaluate(equation, { x: xr });
            xm = xr - (fXr * (xl - xr)) / (fXl - fXr);
            fXm = evaluate(equation, { x: xm });

            iter++;

            if (fXm * fXr > 0) {
                ea = calculateError(xr, xm);
                xr = xm;
            } else if (fXm * fXr < 0) {
                ea = calculateError(xl, xm);
                xl = xm;
            }

            results.push({ iteration: iter, xl: xl, xr: xr, xm: xm, ea: ea });
        }

        setRoot(xm);
        setData(results);
    };

    const handleSubmit = () => {
        const xlNum = parseFloat(XL);
        const xrNum = parseFloat(XR);
        calculateFalsePosition(xlNum, xrNum);
        setHtml(renderTable());
    };

    const renderTable = () => (
        <Container>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Iteration</th>
                        <th>XL</th>
                        <th>XR</th>
                        <th>XM</th>
                        <th>Error (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.iteration}</td>
                            <td>{row.xl}</td>
                            <td>{row.xr}</td>
                            <td>{row.xm}</td>
                            <td>{row.ea.toFixed(6)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );

    return (
        <Container>
            <h1>False Position Method</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Input Equation (f(x))</Form.Label>
                    <input
                        type="text"
                        value={equation}
                        onChange={(e) => setEquation(e.target.value)}
                        className="form-control"
                        style={{ width: "20%", margin: "0 auto" }}
                    />
                    <Form.Label>Input XL</Form.Label>
                    <input
                        type="number"
                        onChange={(e) => setXL(e.target.value)}
                        className="form-control"
                        style={{ width: "20%", margin: "0 auto" }}
                    />
                    <Form.Label>Input XR</Form.Label>
                    <input
                        type="number"
                        onChange={(e) => setXR(e.target.value)}
                        className="form-control"
                        style={{ width: "20%", margin: "0 auto" }}
                    />
                </Form.Group>
                <Button variant="dark" onClick={handleSubmit}>
                    Calculate
                </Button>
            </Form>
            <br />
            {root && <h5>Root = {root.toFixed(6)}</h5>}
            {html}
        </Container>
    );
};

export default FalsePosition;
