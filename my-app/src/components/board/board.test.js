import React from 'react';
import Enzyme from 'enzyme';
import { mount } from "enzyme";
import Board from './board';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('(Component) Board', () => {

  let prop = [
    ["-", "-", "-", "-", "-"], 
    ["|", " ", " ", " ", "|"], 
    ["|", " ", " ", " ", "|"], 
    ["|", " ", " ", " ", "|"], 
    ["-", "-", "-", "-", "-"]
  ];
  
  const wrapper = mount(<Board value = {prop}/>);

  it('should renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('it should render Board', () => {
    expect(wrapper.find("span")).toHaveLength(25);
  });
})