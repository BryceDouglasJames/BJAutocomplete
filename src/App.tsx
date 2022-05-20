import * as React from 'react';
import './App.css';
import CurrentField from './components/fields/current_field';
import Header from './components/header/Header';

export default function App() {
  return (
    <div>
      <Header></Header>
      <CurrentField></CurrentField>
    </div>
  );
}
