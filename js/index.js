class PanelGenerator {
    constructor() {
    };
    // canvas: canvas element to draw panel 
    //    see https://developer.mozilla.org/ja/docs/Web/HTML/Element/canvas
    setCanvas(canvas) {
        this.canvas = canvas;
    }
    // width_element: input element which value is width
    // height_element: input element which value is height
    //     see. https://developer.mozilla.org/ja/docs/Web/HTML/Element/input
    setCanvasSizeElement(width_element, height_element) {
        this.width_element = width_element;
        this.height_element = height_element;
    }
    // x_count_element: input element which value is x division count (>= 1)
    // y_count_element: input element which value is y division count (>= 1)
    //     see. https://developer.mozilla.org/ja/docs/Web/HTML/Element/input
    setCanvasDivisionElement(x_count_element, y_count_element) {
        this.x_count_element = x_count_element;
        this.y_count_element = y_count_element;
    }
    // upside_margin_element: input element which value is height of upside title area
    // downside_margin_element: input element which value is height of downside title area
    // leftside_margin_element: input element which value is height of leftside title area
    // rightside_margin_element: input element which value is height of rightside title area
    //     see. https://developer.mozilla.org/ja/docs/Web/HTML/Element/input
    setCanvasTitleAreaElement(upside_margin_element, downside_margin_element, leftside_margin_element, rightside_margin_element) {
        this.upside_margin_element = upside_margin_element;
        this.downside_margin_element = downside_margin_element;
        this.leftside_margin_element = leftside_margin_element;
        this.rightside_margin_element = rightside_margin_element;
    }
    // method "generate"
    generate_vline(ctx, style, x, y1, y2, line_width) {
        ctx.fillStyle = style;
        const x_start = Math.max(x - line_width, 0);
        const x_end = Math.min(x + line_width, this.canvas.width);
        const y_start = Math.max(Math.min(y1, y2) - line_width, 0);
        const y_end = Math.min(Math.max(y1, y2) + line_width, this.canvas.height);
        ctx.fillRect(x_start, y_start, x_end - x_start, y_end - y_start);
    }
    generate_hline(ctx, style, x1, x2, y, line_width) {
        ctx.fillStyle = style;
        const x_start = Math.max(Math.min(x1, x2) - line_width, 0);
        const x_end = Math.min(Math.max(x1, x2) + line_width, this.canvas.width);
        const y_start = Math.max(y - line_width, 0);
        const y_end = Math.min(y + line_width, this.canvas.height);
        ctx.fillRect(x_start, y_start, x_end - x_start, y_end - y_start);
    }
    generate(width, height, x_count, y_count, upside_margin, downside_margin, leftside_margin, rightside_margin) {
        // get value if param is null
        if (isNaN(width)) { width = Number(this.width_element.value); }
        if (isNaN(height)) { height = Number(this.height_element.value); }
        if (isNaN(x_count)) { x_count = Number(this.x_count_element.value); }
        if (isNaN(y_count)) { y_count = Number(this.y_count_element.value); }
        if (isNaN(upside_margin)) { upside_margin = Number(this.upside_margin_element.value); }
        if (isNaN(downside_margin)) { downside_margin = Number(this.downside_margin_element.value); }
        if (isNaN(leftside_margin)) { leftside_margin = Number(this.leftside_margin_element.value); }
        if (isNaN(rightside_margin)) { rightside_margin = Number(this.rightside_margin_element.value); }
        // calc line width of panel
        const half_line_width = Math.max(Math.trunc(Math.min(width, height)) / 200, 1);

        // skip value check : vaules are sanitized in index.html

        // generate/update canvas.
        this.canvas.width = width;
        this.canvas.height = height;
        const ctx = this.canvas.getContext('2d'); // https://developer.mozilla.org/ja/docs/Web/API/HTMLCanvasElement/getContext
        // draw horizontal line in panel
        const w = width - (leftside_margin + rightside_margin);
        for (let i = 0; i < (x_count + 1); i++) {
            const x = Math.trunc(w * i / x_count) + leftside_margin;
            this.generate_vline(ctx, 'black', x, upside_margin, height - downside_margin, half_line_width);
        }
        const h = height - (upside_margin + downside_margin);
        for (let i = 0; i < (y_count + 1); i++) {
            const y = Math.trunc(h * i / y_count) + upside_margin;
            this.generate_hline(ctx, 'black', leftside_margin, width - rightside_margin, y, half_line_width);
        }
    }
}
