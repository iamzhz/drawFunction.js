class DrawFunc {
    constructor(canvas, width, height, continuityDegree = 0.1) {
        this.context = canvas.getContext('2d');
        this.imageData = this.context.createImageData(width, height);
        this.width = width;
        this.height = height;
        this.continuity = continuityDegree;
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
    drawPoints(points, color=[0, 0, 0, 255]) {
        for (let point of points) {
            this.drawPoint(point.x, point.y, color);
        }
        this.updateCanvas();
    }
    getDistance(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }
    getRatio(p1, p2) { // ratio -> x / y
        let x = p1.x - p2.x;
        let y = p1.y - p2.y;
        return (x / y);
    }
    connectPoints(p1, p2, color=[0, 0, 0, 255]) {
        // Make p1 always to the left of p2
        if (p2.x < p1.x) {
            [p1, p2] = [p2, p1];
        }
        let points = [];
        let distance = this.getDistance(p1, p2);
        let stepX = (p2.x - p1.x) / distance;
        let stepY = (p2.y - p1.y) / distance;
        for (let i = this.continuity; i < distance; i += this.continuity) {
            let x = p1.x + i * stepX;
            let y = p1.y + i * stepY;
            points.push({'x': x, 'y': y});
        }
        this.drawPoints(points, color);
    }
    connectAllPoints(points, color=[0, 0, 0, 255]) {
        for(let i = 0; i < points.length - 1; i++) {
            this.connectPoints(points[i], points[i + 1], color);
        }
    }
    drawFunc(func, color=[0, 0, 0, 255]) {
        let points = [];
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                points.push({'x': x, 'y': func(x)});
            }
        }
        //console.table(points);
        this.drawPoints(points, color);
        this.connectAllPoints(points, color);
    }
    updateCanvas() {
        this.context.putImageData(this.imageData, 0, 0);
    }
}