import React, { FC } from 'react';

export enum TextType {
  PAGE_TITLE,
  CONTENT_TITLE,
  CONTENT,
  NEWS_FLASH_TITLE,
  NEWS_FLASH_CONTENT,
  NEWS_FLASH_DATETIME,
  WIDGET_TITLE,
  WIDGET_CONTENT,
  WIDGET_TABLE_TITLE,
  WIDGET_TABLE_CONTENT,
  WIDGET_TABLE_HEADER,
}

interface IProps {
  type: TextType;
}

const Text: FC<IProps> = ({ type, children }) => {
  switch (type) {
    case TextType.PAGE_TITLE:
      return <h1>{children}</h1>;

    case TextType.CONTENT_TITLE:
      return <h2>{children}</h2>;

    case TextType.CONTENT:
      return <p>{children}</p>;

    case TextType.NEWS_FLASH_TITLE:
      return <p>{children}</p>;

    case TextType.NEWS_FLASH_CONTENT:
      return <p>{children}</p>;

    case TextType.NEWS_FLASH_DATETIME:
      return (
        <p>
          <time>{children}</time>
        </p>
      );
    case TextType.WIDGET_TITLE:
      return <h2>{children}</h2>;

    case TextType.WIDGET_CONTENT:
      return <p>{children}</p>;

    case TextType.WIDGET_TABLE_TITLE:
      return <h4>{children}</h4>;

    case TextType.WIDGET_TABLE_HEADER:
      return <h5>{children}</h5>;

    case TextType.WIDGET_TABLE_CONTENT:
      return <p>{children}</p>;
  }
};

export default Text;
