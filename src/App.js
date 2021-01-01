import React from 'react'
import { FaQuoteLeft } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';

const iconStyle = {
  backgroundColor: '#5d198f',
  color: '#fff',
  padding: '1rem',
  margin: 0
}

const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

function App() {
  const [quotes, setQuotes] = React.useState([]);
  const [randomQuote, setRandomQuote] = React.useState({ quote: '', author: '' });
  const [index, setIndex] = React.useState(0);

  const getRandomQuote = () => {
    if (quotes.length === 0) {
      return;
    }

    const checkNumber = (number) => {
      if (number > quotes.length - 1) {
        return 0;
      }
      if (number < 0) {
        return quotes.length - 1;
      }
      return number;
    };

    let randomNumber = Math.floor(Math.random() * quotes.length);
    if (randomNumber === index) {
      randomNumber = index + 1;
    }
    setIndex(checkNumber(randomNumber));
    setRandomQuote(quotes[index]);
  }

  React.useEffect(() => {
    const fetchQuote = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setQuotes(data.quotes);
    }

    fetchQuote()
  }, [])

  React.useEffect(() => {
    getRandomQuote();
  }, [quotes])


  // console.log(randomQuote)
  const { quote, author } = randomQuote;

  return (

    <div id='quote-box'>
      <FaQuoteLeft style={{ float: 'left', width: '5rem', height: '3rem' }} />
      <h2>Random Quote Generator</h2>
      <h3 id='text'>{quote}</h3>
      <p id='author'>{author}</p>
      <button id='new-quote' onClick={getRandomQuote}>New Quote</button>
      <a href='https://twitter.com/intent/tweet' target="_blank" rel="noreferrer" id='tweet-quote'>
        <FaTwitter style={iconStyle} />
      </a>
    </div>
  );
}

export default App;
