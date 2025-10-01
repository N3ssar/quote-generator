interface Quote {
  id: string;
  quote: string;
  author: string;
}

//DOM Elements
const generateButton = document.querySelector<HTMLButtonElement>(".generate");
const autoGenerateButton = document.querySelector<HTMLButtonElement>(".auto");
const stopGenerateButton = document.querySelector<HTMLButtonElement>(".stop");
const quoteId = document.querySelector<HTMLSpanElement>(".quote-id");
const quoteText = document.querySelector<HTMLParagraphElement>(".quote-text");
const quoteAuthor = document.querySelector<HTMLElement>(".quote-author");
const autoStatus = document.querySelector<HTMLParagraphElement>(".auto-status");
const generatedQuoteCounter =
  document.querySelector<HTMLSpanElement>(".quote-count");

//Variables
let quotesCache: Quote[] = [];
let count = Number(generatedQuoteCounter?.innerText) || 0;
let intervalId: number | undefined;
let lastQuoteId: string | null = null;

//Functions
async function loadQuotes() {
  if (!quotesCache.length) {
    const response = await fetch("./quotes.json");
    quotesCache = await response.json();
  }
  return quotesCache;
}

function displayQuote(quote: Quote) {
  quoteText && (quoteText.innerText = quote.quote);
  quoteId && (quoteId.innerText = quote.id);
  quoteAuthor && (quoteAuthor.innerText = quote.author);
}

async function generateQuote() {
  const quotes = await loadQuotes();
  let randomQuote: Quote;
  do {
    randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  } while (randomQuote.id === lastQuoteId && quotes.length > 1);
  lastQuoteId === randomQuote.id;
  displayQuote(randomQuote);

  generatedQuoteCounter && (generatedQuoteCounter.innerText = `${count++}`);
}

async function autoGenerateQuote() {
  if (intervalId) clearInterval(intervalId);
  generateQuote();
  intervalId = setInterval(generateQuote, 8000);
  autoStatus && (autoStatus.innerText = "Auto Generate is on");
}

function stopGeneration() {
  clearInterval(intervalId);
  autoStatus && (autoStatus.innerText = "");
}

// Event Listeners
generateButton?.addEventListener("click", generateQuote);
autoGenerateButton?.addEventListener("click", autoGenerateQuote);
stopGenerateButton?.addEventListener("click", stopGeneration);
