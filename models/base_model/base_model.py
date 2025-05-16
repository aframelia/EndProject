from abc import ABC, abstractmethod
from typing import List, Dict

class BaseNLPModel(ABC):
    """Abstract base class for NLP model implementations."""
    
    @abstractmethod
    def extract_terms(self, text: str) -> List[Dict]:
        """
        Extract medical terms from input text.
        
        Args:
            text: Input text to process
            
        Returns:
            List of dictionaries containing extracted terms with:
            - text (str): The original term text
            - start (int): Start character offset
            - end (int): End character offset
            - label (str): Semantic type/category
        """
        pass

    @abstractmethod
    def initialize(self, config: Dict):
        """
        Initialize model with configuration.
        
        Args:
            config: Model-specific configuration dictionary
        """
        pass

