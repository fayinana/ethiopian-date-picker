export const toAmharicNumerals = (num: number) => {
    const amharicNumbers = [
      "\u1369", // 1
      "\u136A", // 2
      "\u136B", // 3
      "\u136C", // 4
      "\u136D", // 5
      "\u136E", // 6
      "\u136F", // 7
      "\u1370", // 8
      "\u1371", // 9
      "\u1372", // 10
      "\u1373", // 20
      "\u1374", // 30
    ];
  
    if (num <= 10) {
      // For numbers 1–10, return the corresponding Amharic numeral directly
      return amharicNumbers[num - 1];
    } else if (num < 100) {
      const tens = Math.floor(num / 10) * 10;
      const units = num % 10;
  
      const tensPart = amharicNumbers[8 + tens / 10]; // Get the Amharic numeral for tens
      const unitsPart = units > 0 ? amharicNumbers[units - 1] : ""; // Get units if they exist
  
      // Combine tens and units with no separator as per Amharic numeral convention
      return tensPart + unitsPart;
    } else {
      return num.toString(); // For numbers beyond 99, return the number as a fallback
    }
  };
  