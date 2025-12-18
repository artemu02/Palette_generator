import { Color } from './Color';

interface Point {
    r: number;
    g: number;
    b: number;
}

export class ClusterGenerator {
    private k: number;

    constructor(k: number = 5) {
        this.k = k;
    }

    generate(imageData: ImageData, options: { k: number }): Color[] {
        this.k = options.k;
        const pixels = this.getPixels(imageData);
        console.log(`Found ${pixels.length} pixels`);

        let centroids = this.initCentroidsPlusPlus(pixels);

        const maxIterations = 10;
        for (let i = 0; i < maxIterations; i++) {
            const clusters = new Array(this.k).fill(0).map(() => [] as Point[]);

            // Assign pixels
            for (const pixel of pixels) {
                let minDist = Infinity;
                let closestIndex = 0;

                for (let j = 0; j < centroids.length; j++) {
                    const dist = this.distanceSq(pixel, centroids[j]);
                    if (dist < minDist) {
                        minDist = dist;
                        closestIndex = j;
                    }
                }
                clusters[closestIndex].push(pixel);
            }

            // Update centroids
            let changed = false;
            const newCentroids = clusters.map((cluster, index) => {
                if (cluster.length === 0) return centroids[index];

                let sumR = 0, sumG = 0, sumB = 0;
                for (const p of cluster) {
                    sumR += p.r;
                    sumG += p.g;
                    sumB += p.b;
                }

                const count = cluster.length;
                const newCentroid = {
                    r: sumR / count,
                    g: sumG / count,
                    b: sumB / count
                };

                // Check convergence (squared distance < epsilon)
                if (this.distanceSq(newCentroid, centroids[index]) > 1) {
                    changed = true;
                }
                return newCentroid;
            });

            centroids = newCentroids;
            if (!changed) break;
        }

        // Convert back to Color objects
        // stored as 0-255, need 0-1 for common Color libs if assumed, 
        // but Color class uses culori parse which handles various formats.
        // Let's pass standard RGB objects normalized if needed or just 0-1.
        // My getPixels uses 0-255.
        // Color class in this project uses parse(). parse({mode:'rgb', r:0.5...}) expects 0-1 usually.
        // Let's normalize before creating Color.

        return centroids.map(c => {
            return new Color({
                mode: 'rgb',
                r: c.r / 255,
                g: c.g / 255,
                b: c.b / 255
            });
        });
    }

    private getPixels(imageData: ImageData): Point[] {
        const pixels: Point[] = [];
        const { data } = imageData;
        const step = 4 * 4; // Check every 4th pixel (step=4 bytes * 4 pixels)

        for (let i = 0; i < data.length; i += step) {
            // content is [r, g, b, a, r, g, b, a ...]
            if (data[i + 3] < 128) continue; // Skip transparent

            pixels.push({
                r: data[i],
                g: data[i + 1],
                b: data[i + 2]
            });
        }
        return pixels;
    }

    private initCentroidsPlusPlus(pixels: Point[]): Point[] {
        const centroids: Point[] = [];
        centroids.push(pixels[Math.floor(Math.random() * pixels.length)]);

        for (let i = 1; i < this.k; i++) {
            const distances = pixels.map(p => {
                let minDist = Infinity;
                for (const c of centroids) {
                    const d = this.distanceSq(p, c);
                    if (d < minDist) minDist = d;
                }
                return minDist;
            });

            const sum = distances.reduce((a, b) => a + b, 0);
            let r = Math.random() * sum;

            let nextCentroid = pixels[pixels.length - 1];
            for (let j = 0; j < distances.length; j++) {
                r -= distances[j];
                if (r <= 0) {
                    nextCentroid = pixels[j];
                    break;
                }
            }
            centroids.push(nextCentroid);
        }
        return centroids;
    }

    private distanceSq(p1: Point, p2: Point): number {
        return (p1.r - p2.r) ** 2 + (p1.g - p2.g) ** 2 + (p1.b - p2.b) ** 2;
    }
}
