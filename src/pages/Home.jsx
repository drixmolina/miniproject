export default function Home() {
  return (
    <div className="page home-page">
      <h1>🏠 Welcome to Home</h1>
      <p>
        This is the home page of our React Router application. Navigate through 
        different pages using the navigation menu above.
      </p>
      <div className="page-content">
        <h2>What is React Router?</h2>
        <p>
          React Router is a collection of navigational components that compose 
          declaratively with your application. It keeps your UI in sync with the URL.
        </p>
        <h2>Features:</h2>
        <ul>
          <li>Dynamic route matching</li>
          <li>Location transition handling</li>
          <li>Lazy code loading</li>
          <li>Dynamic route requests</li>
          <li>Backwards compatibility</li>
        </ul>
      </div>
    </div>
  )
}
