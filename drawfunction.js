class DrawFunc {
    constructor(canvas, width, height, continuityDegree = 0.05) {
        this.context = canvas.getContext('2d');
        this.imageData = this.context.createImageData(width, height);
        this.width = width;
        this.height = height;
        this.continuity = continuityDegree;
        this.funcs = [];
    }
    drawPoint(x, y, color=[0, 0, 0, 255]) {
        x = Math.round(x);
        y = Math.round(this.height - 1 - y);
        const index = (x + y * this.width) * 4;
        this.imageData.data[index] = color[0]; // R
        this.imageData.data[index + 1] = color[1]; // G
        this.imageData.data[index + 2] = color[2]; // B
        this.imageData.data[index + 3] = color[3]; // A
    }
    drawPoints(points) {
        for (let point of points) {
            this.drawPoint(point.x, point.y, point.color);
        }
        this.updateCanvas();
    }
    drawFunc(func, color=[0, 0, 0, 255], multiple = 1, addend = 0) {
        this.funcs.push({'func': func, 'color': color});
        let points = [];
        for (let x = 0; x < this.width; x += this.continuity) {
            for (let y = 0; y < this.height; y++) {
                let value = func(multiple * x + addend);
                points.push({'x': x, 'y': value, 'color': color});
            }
        }
        this.drawPoints(points);
    }
    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.imageData = this.context.createImageData(this.width, this.height);
        this.funcs = [];
    }
    reDisplay(multiple, addend) {
        for (let func of this.funcs) {
            this.drawFunc(func, );
        }
    }
    updateCanvas() {
        this.context.putImageData(this.imageData, 0, 0);
    }
}