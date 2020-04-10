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

const Text: FunctionComponent<IProps> = ({type, children}) => {
  const textContent = 
    <Box style={{fontFamily: 'Alef'}}>
      {children}
    </Box>
  
    switch (type) {
      case TextType.PAGE_TITLE:
        return (<h1>{textContent}</h1>);
  
      case TextType.CONTENT_TITLE:
        return (<h2>{textContent}</h2>);
  
      case TextType.CONTENT:
        return (<p>{textContent}</p>);
  
      case TextType.NEWS_FLASH_TITLE:
        return (<p style={{color:'#000000'}}>{textContent}</p>);
  
      case TextType.NEWS_FLASH_CONTENT:
        return (<p>{textContent}</p>);
  
      case TextType.NEWS_FLASH_DATETIME:
        return <p><time>{textContent}</time></p>
    }
};

export default Text;
