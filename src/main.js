import React from 'react';
import ReactDom from 'react-dom';
import JsonInspector from './JsonInspector/'

const data = {
  id: "5ec53e7273f01941f7ec0283",
  index: 0,
  guid: "05f7aed2-8dd1-4934-ba68-5775a0001e51",
  isActive: false,
  name: {
    first: "Koch",
    last: "Hammond",
    name:'TEST'
  }
};
const patterns = [
  {
  value:"name",
   label:'red'
  }
];

  class App extends React.Component {
    render() {
      return (
        <div>
          <JsonInspector
            data={data}
            patterns={patterns}
           />
        </div>
      )
    }
 
  }
  
 
 
  ReactDom.render(
      <App />, 
  document.querySelector('#app'));
