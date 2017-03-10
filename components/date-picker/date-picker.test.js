import 'dom4';
import {renderIntoDocument, isCompositeComponentWithType, Simulate} from 'react-addons-test-utils';

import DatePicker from './date-picker';

import styles from './date-picker.css';

describe('Date Picker', () => {
  const renderComponent = params => renderIntoDocument(DatePicker.factory(params));

  it('should create component', () => {
    isCompositeComponentWithType(renderComponent(), DatePicker).should.be.true;
  });

  it('should render a button', () => {
    renderComponent().node.firstChild.should.match(`button.${styles.datePicker}`);
  });

  it('should use passed className', () => {
    renderComponent({className: 'test-class'}).node.firstChild.should.match('.test-class');
  });

  it('should parse and display passed date', () => {
    renderComponent({date: '01.11.16'}).node.should.have.text('1 Nov 2016');
  });

  it('should accept a Date instance', () => {
    renderComponent({date: new Date(0)}).node.should.have.text('1 Jan 1970');
  });

  it('should render a popup on button click', () => {
    const picker = renderComponent();
    Simulate.click(picker.node);
    document.body.should.contain(`.${styles.datePopup}`);
  });

  // TODO Add more tests
});