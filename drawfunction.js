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
    drawPoints(points, color=[0, 0, 0, 255]) {
        for (let point of points) {
            this.drawPoint(point.x, point.y, color);
        }
        this.updateCanvas();
    }
    /*connectPoints(p1, p2, color=[0, 0, 0, 255]) {
        let x0 = Math.floor(p1.x);
        let y0 = Math.floor(p1.y);
        let x1 = Math.floor(p2.x);
        let y1 = Math.floor(p2.y);
        let dx = Math.abs(x1 - x0);
        let dy = -Math.abs(y1 - y0);
        let sx = (x0 < x1) ? 1 : -1;
        let sy = (y0 < y1) ? 1 : -1;
        let err = ((dx > dy) ? dx : -dy) / 2;
        while (true) {
            this.drawPoint(x0, y0, color);
            if (x0 === x1 && y0 === y1) break;
    
            let e2 = err;
            if (e2 > -dx) {
                err -= dy;
                x0 += sx;
            }
            if (e2 < 0) {
                err += dx;
                y0 += sy;
            }
        }
        this.updateCanvas();
    }
    connectAllPoints(points, color=[0, 0, 0, 255]) {
        for (let i = 0; i < points.length - 1; i++) {
            this.connectPoints(points[i], points[i + 1], color);
        }
    }*/
    drawFunc(func, color=[0, 0, 0, 255]) {
        let points = [];
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                points.push({'x': x, 'y': func(x)});
            }
        }
        //console.table(points);
        this.drawPoints(points, color);
        //this.connectAllPoints(points, color);
    }
    updateCanvas() {
        this.context.putImageData(this.imageData, 0, 0);
    }
}