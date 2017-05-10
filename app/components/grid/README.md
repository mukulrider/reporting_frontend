# Grid

### Overview

A `Grid` component sits in the page surrounding all content (except content that flows full viewport width, e.g. a header or footer). This `Grid` renders a `div.ui-component__grid`.

This rendered div defines a number of columns and a width based on grid breakpoints. Mobile and tablet are fluid grids, while all 3 desktop breakpoints are fixed grids. All columns contain 12px gutters on both sides across all breakpoints.

Mobile (min-width: 504px): `div.ui-component__grid` is 100% width, 8 columns of relative widths.

Tablet (min-width: 756px): `div.ui-component__grid` is 100% width, 12 columns of relative widths

Desktop (min-width: 1008px): `div.ui-component__grid` is 1008px width, 16 columns of 39px each

Desktop L (min-width: 1260px) `div.ui-component__grid` is 1260px width, 20 columns of 39px each

Desktop XL (min-width: 1512px) `div.ui-component__grid` is 1512px width, 24 columns of 39px each

The official spec for the grid is here: http://ddl-toolkit.tesco-ux.com/foundation/grid/specification/view

### Implementation

Currently, this is implemented in SCSS, as with all our UI Component styles. This may change if/when we move our common styles out into its own repo.

[Susy](http://susy.oddbird.net/) was used to create the various grid layouts at each breakpoint. It handles all the calculations. All styles for the grid are defined in the `Grid` component's `styles.scss`.

### Usage

#### Creating a wrapper within the grid

To create a grid container on your page, add a `Grid` component to your page, which will wrap your spanned container. This `Grid` renders a `div.ui-component__grid`, which implements the DDL grid. You then create a spanned container for your content and define how it should sit in the grid at each breakpoint. The spanned container will take up N columns of the grid depending on what width you require at each breakpoint.

##### Example

***1)*** Ensure you have SCSS and Susy installed in your application.

Create a simple content wrapper which sits centered on the grid. We will configure how many columns it spans per breakpoint.

***2)*** Wrap your content in a `<Grid/>` component.

```js
  return (
    <Grid>
      <div className="wrapper"></div>
    </Grid>
  );
```

***3)*** Define base mobile-first styles. The `gridBase()` mixin allows you to target styles within the grid container outside of any breakpoints, i.e. mobile first styles from 0px up to the first breakpoint that you define, e.g. mobile at min-width 504px.

Below, we're saying our wrapper should be full width up to the next breakpoint that we will define in the next step. The spanned wrapper will have `12px` gutters on both sides. We need to set the gutters here as we only have one spanned element. 
In cases where we're spanning two containers across the full width of the grid, the grid will take care of the gutters for us. This is because we would use Susy's `span(N or N)` mixin. In this example, we're just using Susy's `span(N)` function to give us a width across N columns, so we need to specifiy the gutter separately. See below:

```scss
@include gridBase() {
  .wrapper {
    width: 100%;
    padding-left: gutter();
    padding-right: gutter();
  }
}
```

***4)*** Now we move onto the next relevant breakpoint, which is tablet, `min-width: 756px`. At this point, we want our wrapper to span 10 of the 12 available columns, centered. We're skipping the mobile breakpoint as there's no change there because the wrapper remains 100% width from 504px up to tablet. (When adding mobile targetted styles, use the `gridMobile()` mixin in the same fashion as others.)

Below, we're saying keep our container centered from 756px onwards, keeping 10 of 12 columns width. As explained in the overview, at tablet, the grid (`min-width 756px`) is fluid, therefore Susy will make the width a percentage of 10/12.

```scss
@include gridTablet() {
  .wrapper {
    width: span(10); // 10 of 12, fluid columns
    margin-left: auto;
    margin-right: auto;
  }
}
```

***5)*** Now onto the next breakpoint, desktop. Here we want to span our wrapper by 14 columns of the fixed width for `min-width: 1008px`.

```scss
@include gridDesktop() {
  .wrapper {
    width: span(14); // 14 of 16, fixed columns
  }
}
```

***6)*** In large destkop (`min-width: 1260px`) and extra large desktop (`min-width: 1512px`), we span the same number of columns as above.

```scss
@include gridDesktopLarge() {
  .wrapper {
    width: span(14); // 14 of 20, fixed columns
  }
}
```

```scss
@include gridDesktopXLarge() {
  .wrapper {
    width: span(14); // 14 of 24, fixed columns
  }
}
```

That's it! You should be able to see the wrapper breaking to the correct width at each breakpoint in your browser as you reduce/expand the viewport width.

#### Column Width Classes

There are a few basic mixins and corresponding wrapper classes for setting the width of an element based on quarter measurements.

##### Example #1

Set your element to 50% width

```scss
.my-element {
  @include col--1-2;
}
```

Or:

```html
<div class="col--1-2"></div>
```

##### Example #2

Set your element to 3/4 width for all viewports wider than mobile

```scss
.my-element {
  width: 100%;
}

@media (min-width: 504px) {
  .my-element {
    @include col--3-4;
  }
}
```
