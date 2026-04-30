export default function About() {
  return (
    <div className="page about-page">
      <h1>ℹ️ About Us</h1>
      <p>
        Learn more about this React training application and the concepts 
        we're exploring.
      </p>
      <div className="page-content">
        <h2>About This Application</h2>
        <p>
          This is a React.js training application that demonstrates various 
          React concepts and features. It showcases:
        </p>
        <ul>
          <li><strong>Components:</strong> Reusable building blocks</li>
          <li><strong>Props:</strong> Passing data between components</li>
          <li><strong>State:</strong> Managing component data</li>
          <li><strong>Hooks:</strong> useState, useEffect, useContext</li>
          <li><strong>API Integration:</strong> Fetching data from APIs</li>
          <li><strong>Routing:</strong> Multi-page navigation</li>
          <li><strong>Context API:</strong> Global state management</li>
        </ul>

        <h2>Training Objectives</h2>
        <p>
          By completing this training, you will understand:
        </p>
        <ul>
          <li>React fundamentals and component architecture</li>
          <li>How to manage state and side effects</li>
          <li>Integration with external APIs</li>
          <li>Building single-page applications with routing</li>
          <li>Authentication and authorization basics</li>
        </ul>
      </div>
    </div>
  )
}
