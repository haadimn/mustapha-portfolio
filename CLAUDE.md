# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This repository is currently empty (only a README title, no code, no build tooling, no framework chosen yet). There are no commands to run and no architecture to document.

Update this file once the project is scaffolded: add build/lint/test commands and a high-level architecture overview at that point.

## Subagents

Prefer delegating to subagents (the Agent tool) over doing multi-step or exploratory work inline — use `fork` for research/investigation that doesn't need to stay in main context, and parallel Agent calls for independent tasks.
