class DrawFunc {
    constructor(canvas, width, height) {
        this.context = canvas.getContext('2d');
        this.imageData = this.context.createImageData(width, height);
        this.width = width;
        this.height = height;
    }
    drawPoint(x, y, color=[0, 0, 0, 255]) {
        y = this.height - 1 - y;
        const index = (x + y * this.width) * 4;
        this.imageData.data[index] = color[0]; // R
        this.imageData.data[index + 1] = color[1]; // G
        this.imageData.data[index + 2] = color[2]; // B
        this.imageData.data[index + 3] = color[3]; // A
    }
    drawPoints(points) {
        for (let point of points) {
            this.drawPoint(point.x, point.y);
        }
        this.updateCanvas();
    }
    drawFunc(func, color=[0, 0, 0, 255]) {
        let points = [];
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                points.push({'x': x, 'y': func(x)});
            }
        }
        console.table(points);
        this.drawPoints(points, color);
        //this.connectPoints(points, color);
        this.updateCanvas(points, color);
    }
    updateCanvas() {
        this.context.putImageData(this.imageData, 0, 0);
    }
}