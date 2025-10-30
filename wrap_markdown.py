import re
import argparse
from textwrap import fill

def process_paragraphs(text, wrap_width):
    # Match metadata section (YAML) to ignore
    metadata_regex = r"^---\n(?:.*\n)*?---\n"
    metadata_match = re.match(metadata_regex, text)

    # Separate metadata if present
    if metadata_match:
        metadata = metadata_match.group()
        content = text[len(metadata):]
    else:
        metadata = ""
        content = text

    # Paragraph regex (adjusted to ignore metadata)
    paragraph_regex = r"(^|\n\n)(?!#|\*|\+|-|>|    |\t|`{3}|~~~|---)([^\n]+(?:\n[^\n]+)*)(?=\n\n|\n$)"

    def process_match(match):
        # Remove extra spaces and newlines within the paragraph
        paragraph = " ".join(line.strip() for line in match.group(2).splitlines())
        # Wrap the text to the specified column width
        return match.group(1) + fill(paragraph, width=wrap_width)

    # Process and replace paragraphs
    processed_content = re.sub(paragraph_regex, process_match, content)

    # Recombine metadata with processed content
    return metadata + processed_content

def main():
    parser = argparse.ArgumentParser(description="Wrap paragraphs in a Markdown file to a specific column width.")
    parser.add_argument("file", help="Path to the Markdown file to process.")
    parser.add_argument("-w", "--width", type=int, default=80, help="Column width to wrap paragraphs (default: 80).")
    args = parser.parse_args()

    with open(args.file, 'r', encoding='utf-8') as f:
        text = f.read()

    processed_text = process_paragraphs(text, args.width)

    with open(args.file, 'w', encoding='utf-8') as f:
        f.write(processed_text)

    print(f"File '{args.file}' processed successfully.")

    # try:
    #     with open(args.file, 'r', encoding='utf-8') as f:
    #         text = f.read()

    #     processed_text = process_paragraphs(text, args.width)

    #     with open(args.file, 'w', encoding='utf-8') as f:
    #         f.write(processed_text)

    #     print(f"File '{args.file}' processed successfully.")
    # except Exception as e:
    #     print(f"Error processing file: {e}")

if __name__ == "__main__":
    main()
