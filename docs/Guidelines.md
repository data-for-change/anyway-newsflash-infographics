# Guidelines<a id="guidelines"></a>

- ### [Typography](#typography)

### Typography ↸ <a id="typography"></a> [🔼](#guidelines)

Typography is all about how text should be displayed in the app.
You don't need to style text yourslef - jus use one of our Typography variants.

Variants number represent sizes - `Title1` has bigger font than `Title2`, and `Body4` has smaller font than `Body2`.

Example:

const SomeComponent: FC<IProps> = () => (

<div>
<Typography.Title1>How much wood</Typography.Title1>
<Typography.Body3>as a woodchuck could chuck, If a woodchuck could chuck wood</Typography.Body3>
</div>
);

Title variants (Title1, Title2) will be converted to headline tags (like `h2` and `h3`),
while body will be converted to `<span>` tag. Since `<span>` should only include [Phrasing Content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content) like text, other `span` etc., make sure you do not include elemnts which make the html invalid.

For example, This is OK:

```
<Box display="flex">
  <Typography.Body5>That's all folks!</Typography.Body3>
</Box>
```

This is NOT OK, since `<Box>` will be converted to `<div>`, which cannot be placed inside a `<span>`

```
<Typography.Body5>
	<Box display="flex">
		That's all folks!
	</Box>
</Typography.Body3>
```
