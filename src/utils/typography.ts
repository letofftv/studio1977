export function fixTypography(text: string | null | undefined): string {
  if (!text) return "";

  // 1. Replace spaces with non-breaking spaces after short prepositions and conjunctions (1-3 letters)
  // This avoids hanging words at the end of lines ("сопли").
  // Regex looks for word boundary, 1-3 Russian letters, space.
  const regex = /(\b[а-яА-ЯёЁ]{1,3})\s+/g;
  let fixed = text.replace(regex, "$1\u00A0"); // \u00A0 is non-breaking space
  
  // 2. Dash formatting: replace separate hyphens with em-dash
  fixed = fixed.replace(/\s+-\s+/g, "\u00A0— ");

  return fixed;
}
