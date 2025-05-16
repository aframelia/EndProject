from typing import List, Dict
from medcat import Cat
from base_model.base_model import BaseNLPModel

class MedCATModel(BaseNLPModel):
    """MedCAT implementation of the NLP model interface."""
    
    def __init__(self):
        self.cat = None
        
    def initialize(self, config: Dict):
        """Initialize MedCAT model"""
        self.cat = Cat.load_model_pack(
            model_pack_path=config['model_path'],
            config=config['model_config'])
        )
        
    def extract_terms(self, text: str) -> List[Dict]:
        """Extract medical concepts using MedCAT"""
        if not self.cat:
            raise ValueError("Model not initialized. Call initialize() first.")
            
        entities = self.cat.get_entities(text)
        
        return [
            {
                'text': ent['source_value'],
                'start': ent['start'],
                'end': ent['end'],
                'label': ent['type_name'],
                'confidence': ent['confidence'],
                'cui': ent['cui']  # MedCAT-specific UMLS concept ID
            }
            for ent in entities.values()
        ]

