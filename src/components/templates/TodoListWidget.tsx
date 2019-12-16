import React, {FunctionComponent, useState} from 'react';
import {Text, TextType} from '../atoms/Text';
import {TodoList} from '../organisms/TodoList';
import {getTodoCollection} from '../../services/data.service';
import {Textbox} from '../atoms/Textbox';
import {ITodo} from '../../models/Todo';
import {Button} from '../atoms/Button';
import {useDynamicInput} from '../../hooks/form.hooks';

interface IProps {
}

const MIN_FILTER_CHAR = 2;

export const TodoListWidget: FunctionComponent<IProps> = () => {
  const allTodoCollection = getTodoCollection();
  const [todoListItems, setTodoListItems] = useState(allTodoCollection);
  const text = useDynamicInput('', filterItems);
  
  function filterItems (str: string) {
    if(str.length >= MIN_FILTER_CHAR) {
      const filtered = allTodoCollection.filter((todo: ITodo) => todo.title.toLocaleLowerCase().includes(str.toLocaleLowerCase()));
      setTodoListItems(filtered); // filter items
    } else {
      setTodoListItems(allTodoCollection);  // show all items
    }
  }
  
  const clearFilter = () => {
    text.onChange('');  // reset filter value
  };
  
  return (
    <div>
      <Text type={TextType.CONTENT_TITLE}>Tasks list</Text>
      <Textbox {...text}/>
      <Button onClick={clearFilter}>Clear</Button>
      <TodoList items={todoListItems}/>
    </div>
  );
};
