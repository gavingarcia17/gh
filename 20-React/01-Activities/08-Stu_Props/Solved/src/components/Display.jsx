import Card from './Card';

const feline = {
  name: 'Fluffykins',
  description: 'A cat that acts like a dog',
  id: 2,
  animal_age: 3,
};

const dog = {
  name: 'Doggo',
  description: 'A dog that acts like a cat',
  id: 1,
  animal_age: 5,
};

const giraffe = {
  name: 'Longboi',
  description: 'A giraffe that acts like a dog',
  id: 3,
  animal_age: 2,
};


export default function Display() {
  return (
    <div>
      <Card {...feline} />
      <Card {...dog} />
      <Card {...giraffe} />
    </div>
  );
}
