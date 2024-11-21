console.log('hello world');

try {
  const response = await fetch('/api/v1/cars');
  if(!response.ok) throw response;
  const data = await response.json();
  console.log(data);
} catch (err) {
  console.log(err);
}