import medspacy
from medspacy.ner import TargetRule
from typing import List, Dict
from base_py import BaseNLPModel

class MedSpaCyNLP(BaseNLPModel):
    def __init__(self):
        self.nlp = None

    def initialize(self, config: Dict):
        """
        Initialize the medspaCy pipeline with optional config.
        Example config keys: {'quick_umls': True}
        """
        self.nlp = medspacy.load(enable=["medspacy_ner", "medspacy_context", "medspacy_sectionizer"])
        
        # Optional: Load additional rules or UMLS-based pipeline if specified
        if config.get("quick_umls"):
            try:
                from medspacy_quickumls import QuickUMLSComponent
                quick_umls = QuickUMLSComponent(self.nlp, **config.get("quick_umls_config", {}))
                self.nlp.add_pipe(quick_umls, last=True)
            except ImportError:
                print("QuickUMLS component could not be loaded. Is it installed?")

    def extract_terms(self, text: str) -> List[Dict]:
        """
        Extract medical terms using medspaCy pipeline.
        """
        if self.nlp is None:
            raise ValueError("Model not initialized. Call initialize() first.")

        doc = self.nlp(text)
        extracted = []

        for ent in doc.ents:
            extracted.append({
                "text": ent.text,
                "start": ent.start_char,
                "end": ent.end_char,
                "label": ent.label_
            })

        return extracted
