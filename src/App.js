import { Card } from './Library';
import './App.css';

let plates = [
  {title: "Python Boilerplate", tagline: "Python 3.9 with PIL and venv", url: "localhost.test", tags: ["python", "venv", "PIL", "basic"], body: "Lorem ipsum dolor et etc."},
  {title: "Python Boilerplate", tagline: "Python 3.9 with PIL and venv", url: "localhost.test", tags: ["python", "venv", "PIL", "basic"], body: "Lorem ipsum dolor et etc."},
  {title: "Python Boilerplate", tagline: "Python 3.9 with PIL and venv", url: "localhost.test", tags: ["python", "venv", "PIL", "basic"], body: "Lorem ipsum dolor et etc."}
]

function App() {
  return (
    <div className="boiler-card-gallery">
      {plates.map((plate, key) => <Card key={key} {...plate}></Card>)}
    </div>
  );
}

      //<Card title="Python Boilerplate" tagline="Python 3.9 with PIL and Venv" url="localhost.test" tags={["python", "venv", "PIL", "basic"]} body="Lorem Ipsum, babey"></Card>
export default App;
