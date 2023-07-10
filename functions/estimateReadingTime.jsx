
export default function estimateReadingTime(text) {


    const averageWordsPerMinute = 200;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / averageWordsPerMinute);

    return readingTimeMinutes
}