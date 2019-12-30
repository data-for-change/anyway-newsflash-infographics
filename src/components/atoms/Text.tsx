import React, {FunctionComponent} from 'react';
import {Box} from '@material-ui/core';

export enum TextType {
  PAGE_TITLE,
  CONTENT_TITLE,
  CONTENT,
  NEWS_FLASH_TITLE,
  NEWS_FLASH_CONTENT,
  NEWS_FLASH_DATETIME
}

interface IProps {
  type: TextType
}

export const Text: FunctionComponent<IProps> = ({type, children}) => {
  switch (type) {
    case TextType.PAGE_TITLE:
      return (<h1>{children}</h1>);
    
    case TextType.CONTENT_TITLE:
      return (<h2>{children}</h2>);
    
    case TextType.CONTENT:
      return (<p>{children}</p>);
  
    case TextType.NEWS_FLASH_TITLE:
      return (<Box fontWeight={'bold'}>{children}</Box>);
  
    case TextType.NEWS_FLASH_CONTENT:
      return (<Box component='p' fontWeight='bold' color='#6495ed'>{children}</Box>);
    case TextType.NEWS_FLASH_DATETIME:
      return <p><time>{children}</time></p>
  }
};
