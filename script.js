"use strict";
//DOM Elements
const generateButton = document.querySelector(".generate");
const autoGenerateButton = document.querySelector(".auto");
const stopGenerateButton = document.querySelector(".stop");
const quoteId = document.querySelector(".quote-id");
const quoteText = document.querySelector(".quote-text");
const quoteAuthor = document.querySelector(".quote-author");
const autoStatus = document.querySelector(".auto-status");
const generatedQuoteCounter = document.querySelector(".quote-count");
//Variables
let quotesCache = [];
let count = Number(generatedQuoteCounter?.innerText) || 0;
let intervalId;
let lastQuoteId = null;
//Functions
async function loadQuotes() {
    if (!quotesCache.length) {
        const response = await fetch("./quotes.json");
        quotesCache = await response.json();
    }
    return quotesCache;
}
function displayQuote(quote) {
    quoteText && (quoteText.innerText = quote.quote);
    quoteId && (quoteId.innerText = quote.id);
    quoteAuthor && (quoteAuthor.innerText = quote.author);
}
async function generateQuote() {
    const quotes = await loadQuotes();
    let randomQuote;
    do {
        randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (randomQuote.id === lastQuoteId && quotes.length > 1);
    lastQuoteId === randomQuote.id;
    displayQuote(randomQuote);
    generatedQuoteCounter && (generatedQuoteCounter.innerText = `${count++}`);
}
async function autoGenerateQuote() {
    if (intervalId)
        clearInterval(intervalId);
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
