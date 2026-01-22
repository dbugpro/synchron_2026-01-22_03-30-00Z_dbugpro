#!/usr/bin/env python3
"""
html_frame_builder.py
---------------------
Builds new-frame.html using the dbugtools library,
with session‑aware rollover linked to the BBC BOOK system.
Generates HTML output from findex(url), with optional verbose logging
and BBC BOOK session log integration.
"""

import sys
import logging
from datetime import datetime
from pathlib import Path
from dbugtools import findex
import configparser

CONFIG_FILE = "html_frame_builder.ini"

# ------------------------------------------------------------
# Load or create the configuration
# ------------------------------------------------------------
def load_config(session_id: str) -> configparser.ConfigParser:
    """Load or create configuration and update for the active session."""
    config = configparser.ConfigParser()
    config.read(CONFIG_FILE)

    # If session section doesn’t exist, create it dynamically
    if session_id not in config:
        config[session_id] = {
            "summary_log": f"/secure/bbcbook/logs/bbc_book_summary_{session_id[-6:]}.txt",
            "audit_log": f"/secure/bbcbook/audit/{session_id[-6:]}/bbc_audittrail_{session_id[-6:]}.log",
            "html_file": f"new-frame_{session_id[-6:]}.html",
            "local_log": f"html_frame_builder_{session_id[-6:]}.log",
            "verbose_default": "False",
        }
        with open(CONFIG_FILE, "w", encoding="utf-8") as f:
            config.write(f)
        print(f"[INFO] New session section created in {CONFIG_FILE}: {session_id}")

    return config


# ------------------------------------------------------------
# Logging setup
# ------------------------------------------------------------
def setup_logger(log_path: Path):
    """Configure local file logging."""
    logging.basicConfig(
        filename=log_path,
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )


# ------------------------------------------------------------
# BBC BOOK log entry writer
# ------------------------------------------------------------
def write_bbc_log_entry(summary_file: Path, audit_file: Path, message: str):
    """Append synchronized BBC BOOK log entries."""
    timestamp = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S GMT")
    log_line = f"[{timestamp}] FRAME_BUILDER | {message}\n"
    for path in [summary_file, audit_file]:
        try:
            path.parent.mkdir(parents=True, exist_ok=True)
            with open(path, "a", encoding="utf-8") as f:
                f.write(log_line)
        except Exception as e:
            logging.warning(f"Failed to update BBC log at {path}: {e}")


# ------------------------------------------------------------
# Core function
# ------------------------------------------------------------
def build_html_frame(url: str, session_id: str, config: configparser.ConfigParser, verbose: bool = False) -> None:
    """Generate HTML frame using dbugtools.findex and update logs."""
    section = config[session_id]
    output_file = section.get("html_file", "new-frame.html")
    log_file = section.get("local_log", "html_frame_builder.log")
    summary_file = Path(section["summary_log"])
    audit_file = Path(section["audit_log"])

    setup_logger(Path(log_file))
    try:
        logging.info(f"Starting frame build for URL: {url} (Session: {session_id})")
        if verbose:
            print(f"[INFO] [{session_id}] Building HTML frame from URL: {url}")

        html_data = findex(url)
        with open(output_file, "w", encoding="utf-8") as file:
            file.write(html_data)

        logging.info(f"HTML frame successfully written to {output_file}")
        write_bbc_log_entry(summary_file, audit_file, f"SUCCESS → {output_file} built from URL: {url}")

        if verbose:
            print(f"[SUCCESS] [{session_id}] Frame built → {output_file}")

    except Exception as e:
        error_message = f"Failed to build HTML frame: {e}"
        logging.error(error_message)
        write_bbc_log_entry(summary_file, audit_file, f"ERROR → {error_message}")
        if verbose:
            print(f"[ERROR] [{session_id}] {error_message}")


# ------------------------------------------------------------
# Entry point
# ------------------------------------------------------------
def main():
    if len(sys.argv) < 3:
        print("Usage: python html_frame_builder.py <session_id> <url> [--verbose]")
        sys.exit(1)

    session_id = sys.argv[1]
    url = sys.argv[2]
    verbose = "--verbose" in sys.argv

    config = load_config(session_id)
    write_bbc_log_entry(
        Path(config[session_id]["summary_log"]),
        Path(config[session_id]["audit_log"]),
        f"Frame builder session start ({session_id})"
    )

    build_html_frame(url, session_id, config, verbose)

    write_bbc_log_entry(
        Path(config[session_id]["summary_log"]),
        Path(config[session_id]["audit_log"]),
        f"Frame builder session complete ({session_id})"
    )


if __name__ == "__main__":
    main()
