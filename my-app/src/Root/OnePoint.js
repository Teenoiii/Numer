import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'

const OnePointIteration = () => {
    const print = () => {
        console.log(data)
        setValueIter(data.map((x) => x.iteration));
        setValueX(data.map((x) => x.X));
        return (
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="45%">X</th>
                            <th width="45%">f(X)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{element.iteration}</td>
                                    <td>{element.X}</td>
                                    <td>{element.fX}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        );
    }

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const CalOnePointIteration = (x0) => {
        var xnew, fX, ea;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj = {};
        do {
            let scope = { x: x0 };
            xnew = evaluate(Equation, scope);
            ea = error(x0, xnew);

            obj = {
                iteration: iter + 1,
                X: xnew,
                fX: xnew
            };
            data.push(obj);

            x0 = xnew;
            iter++;
        } while (ea > e && iter < MAX);
        setX(xnew);
    }

    const data = [];
    const [valueIter, setValueIter] = useState([]);
    const [valueX, setValueX] = useState([]);

    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("sqrt(13/x)");
    const [X, setX] = useState(0);
    const [X0, setX0] = useState(0);

    const inputEquation = (event) => {
        console.log(event.target.value);
        setEquation(event.target.value);
    }

    const inputX0 = (event) => {
        console.log(event.target.value);
        setX0(event.target.value);
    }

    const calculateRoot = () => {
        const x0num = parseFloat(X0);
        CalOnePointIteration(x0num);
        setHtml(print());
        console.log(valueIter);
        console.log(valueX);
    }

    return (
        <Container>
            <h1>One-Point Iteration Method</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Input g(x)</Form.Label>
                    <input type="text" value={Equation} onChange={inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control" />
                    <Form.Label>Input Initial X</Form.Label>
                    <input type="number" onChange={inputX0} style={{ width: "20%", margin: "0 auto" }} className="form-control" />
                </Form.Group>
                <Button variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
            </Form>
            <br />
            <h5>Answer = {X.toPrecision(7)}</h5>
            <Container>
                {html}
            </Container>
        </Container>
    )
}

export default OnePointIteration;
