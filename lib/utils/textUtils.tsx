import React from "react";

/**
 * Highlights matching text in a string by wrapping matches with a <mark> element
 * @param text - The text to search within
 * @param query - The search query to highlight
 * @returns JSX element with highlighted matches
 */
export const highlightMatch = (
  text: string,
  query: string
): React.ReactElement => {
  if (!query.trim()) return <span>{text}</span>;

  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark
            key={index}
            className="bg-yellow-200 dark:bg-yellow-800 text-foreground"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};
