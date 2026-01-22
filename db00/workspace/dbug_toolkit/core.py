"""
DBug ToolKit Core Module (Node 00)
==================================
This module provides the foundational functionality for parsing,
encoding, auditing, and previewing binary-to-BBCBOOK conversions.
"""

from datetime import datetime

SUMMARY_PATH = "bbc_book_summary_260119.txt"

def binary_probe(stream: str) -> dict:
    """Analyse the structure of a binary input stream."""
    header = stream[:8]
    payload = stream[8:-4]
    checksum = stream[-4:]
    return {
        "header": header,
        "payload_length": len(payload),
        "checksum": checksum,
    }

def encode_to_bbcword(binary_cluster: str, table_map: dict) -> str:
    """Convert a verified binary sequence into BBCBOOK lexical form."""
    return "".join(table_map.get(bit, "?") for bit in binary_cluster)

def append_to_summary(log_entry: str):
    """Write structured audit data directly into the session summary file."""
    timestamp = datetime.utcnow().isoformat()
    formatted = f"[{timestamp}] {log_entry}\n"
    with open(SUMMARY_PATH, "a", encoding="utf-8") as f:
        f.write(formatted)
