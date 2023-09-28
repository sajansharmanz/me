# Reusable components for any flavour of JavaScript

Picture this; your team have been developing a solution with hundreds of components in ReactJS for more than a year. One day management comes to you and says sorry team! From next month we have to re-develop our solution in VueJS. Sound silly? Yes, but i've now worked at a few companies that have done something along these lines now.

No one want's to develop hundreds of components over again! And what if they come back a a couple of years later and say we're changing system again? Well there is a solution!

# [StencilJS](https://stenciljs.com/)

> Stencil is a compiler that generates Web Components (more specifically, Custom Elements).

> Stencil uses TypeScript, JSX, and CSS to create standards-compliant Web Components that can be used to craft high quality component libraries.

> Web Components generated with Stencil can be used with popular frameworks right out of the box. In addition, Stencil can generate framework-specific wrappers that allow Stencil components to be used with a framework-specific developer experience.

The basic stucture of a component is

```javascript
import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  @Prop() first: string;
  @Prop() middle: string;
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return <div>Hello, World! I'm {this.getText()}</div>;
  }
}
```

Once compiled, this component can be used in HTML just like any other tag.

```javascript
<my-component
  first="Stencil"
  middle="'Don't call me a framework'"
  last="JS"
></my-component>
```

When rendered, the browser will display `Hello World! I'm Stencil 'Don't call me a framework' JS`.

Read more at [https://stenciljs.com](https://stenciljs.com/).
