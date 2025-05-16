import openai
from typing import List, Dict
from base_py import BaseNLPModel

class GPTNLPModel(BaseNLPModel):
    def __init__(self):
        self.api_key = None
        openai.api_key = None

    def initialize(self, config: Dict):
        """
        Initialize model with configuration (expects OpenAI API key).
        """
        self.api_key = config.get("api_key")
        openai.api_key = self.api_key

    def extract_terms(self, text: str) -> List[Dict]:
        """
        Extracts clinical problems from input text using GPT.
        Returns a list of dictionaries with 'text', 'start', 'end', and 'label' keys.
        """
        prompt = (
            "Extract all clinical problems in text. "
            "Return its UMLS Concept Unique Identifier (CUI) and preferred name. "
            "Return a Python list of strings. Text:\n\n"
            f"{text}"
        )

        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a clinical NLP assistant that returns UMLS codes."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0,
            )

            output = response['choices'][0]['message']['content']
            terms = eval(output) if isinstance(output, str) else output

            extracted = []
            for term in terms:
                if isinstance(term, str):
                    start = text.lower().find(term.lower())
                    end = start + len(term) if start != -1 else -1
                    extracted.append({
                        "text": term,
                        "start": start,
                        "end": end,
                        "label": "Problem"
                    })
            return extracted

        except Exception as e:
            print(f"GPT extraction failed: {e}")
            return []
