import HelloReact from './components/HelloReact';

// TODO: Add a comment explaining what this function is doing
// This function is a functional component that helps us split the UI into distinct parts.
// In this case, we are returning another component, <HelloReact/> from it.
function App() {
  return <div>
    <h1>Title</h1>
    <HelloReact />
  </div>;
}

export default App;
