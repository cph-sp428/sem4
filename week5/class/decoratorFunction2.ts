
const subtract = (a: number, b: number) => a - b;

const subtractDecorator = (fn : typeof subtract) => {
    return (a: number, b: number) => {
        console.log(`Subtracting ${a} - ${b}`);
        return fn(a, b);
    }
}

const tenMinusFive = subtract(10, 5);

const subtractWithLogging = subtractDecorator(tenMinusFive);