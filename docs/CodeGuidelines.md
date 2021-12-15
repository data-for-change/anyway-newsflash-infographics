# Guidelines<a id="guidelines"></a>

- ### [Styling](#styling)
- ### [Typography](#typography)

### Styling ↸ <a id="styling"></a> [🔼](#guidelines)
There are 2 ways to affect styling:
* `index.css` - for limited set global stuff (mostly you won't need it)
* Using MUI styling system

Guidelines for styling a specific component
* Use MUI [hook API](https://mui.com/styles/basics/#hook-api) form
* Spacing
  - Avoid using specific sizes (like `4px` or `2vw`) for padding and margins. Use [theme.spacing](https://mui.com/customization/spacing/) instead
  - Avoid using decimal values (like `theme.spacing(1.7)`), use integers only (`theme.spacing(2)`)
* Theming - sometimes it is make more sense to change the theme options rather than a specific component. See MUI [theme section](https://mui.com/customization/theming/), and also our `theme.ts` file 

### Typography ↸ <a id="typography"></a> [🔼](#guidelines)

Typography is all about how text should be displayed in the app.
You don't need to style text yourself - just use one of our Typography variants.

Variant numbers represent sizes - `Title1` has bigger font than `Title2`, and `Body4` has smaller font than `Body2`.

Example:

```
const SomeComponent: FC<IProps> = () => (
  <div>
    <Typography.Title1>How much wood</Typography.Title1>
    <Typography.Body3>
      would a woodchuck chuck If a woodchuck could chuck wood
    <Typography.Body3>
  </div>
);
```

Title variants (Title1, Title2) will be converted to headline tags (like `h2` and `h3`),
while body will be converted to `<span>` tag. Since `<span>` should only include [Phrasing Content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) like text, other `span`s etc., make sure you do not include elements which make the html invalid.

For example, This is OK:

```
<Box display="flex">
  <Typography.Body5>That's all folks!</Typography.Body5>
</Box>
```

This is NOT OK, since `<Box>` will be converted to `<div>`, which cannot be placed inside a `<span>`

```
<Typography.Body5>
	<Box display="flex">
		That's all folks!
	</Box>
</Typography.Body5>
```
