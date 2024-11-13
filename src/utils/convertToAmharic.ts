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
      "\u1375", // 40
      "\u1376", // 50
      "\u1377", // 60
      "\u1378", // 70
      "\u1379", // 80
      "\u137A", // 90
      "\u137B", // 100
      "\u137C", // 200
      "\u137D", // 300
      "\u137E", // 400
      "\u137F", // 500
      "\u1380", // 600
      "\u1381", // 700
      "\u1382", // 800
      "\u1383", // 900
      "\u1384", // 1000
      "\u1385", // 2000
      "\u1386", // 3000
      "\u1387", // 4000
      "\u1388", // 5000
      "\u1389", // 6000
      "\u138A", // 7000
      "\u138B", // 8000
      "\u138C", // 9000
    ];
  
    // Handle years (which can be more than 100)
    if (num >= 100) {
      const hundreds = Math.floor(num / 100); // Extract hundreds
      const tens = Math.floor((num % 100) / 10); // Extract tens
      const units = num % 10; // Extract units
  
      let result = "";
  
      // For hundreds part (using the 100's symbols like 100, 200, etc.)
      if (hundreds > 0) {
        result += "፻"; // Hundreds part, appended with "፻" symbol for 100s
      }
  
      // For tens part
      if (tens > 0) {
        result += amharicNumbers[8 + tens - 1] + "፲"; // Tens part, appended with "፲" symbol for tens
      }
  
      // For units part (no suffix)
      if (units > 0) {
        result += amharicNumbers[units - 1]; // Units part
      }
  
      return result;
    } else if (num <= 10) {
      // For numbers 1-10, return the corresponding Amharic numeral directly
      return amharicNumbers[num - 1];
    } else if (num < 100) {
      // Handle numbers between 11 and 99
      const tens = Math.floor(num / 10) * 10;
      const units = num % 10;
  
      const tensPart = amharicNumbers[8 + tens / 10]; // Get the Amharic numeral for tens
      const unitsPart = units > 0 ? amharicNumbers[units - 1] : ""; // Get units if they exist
  
      // Combine tens and units with no separator
      return tensPart + unitsPart;
    } else {
      return num.toString(); // For any other number, return it as a string (fallback)
    }
  };
  