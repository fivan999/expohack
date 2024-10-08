import asyncio
from typing import Generator

import pytest


@pytest.fixture(scope='session')
def event_loop() -> Generator:
    loop = asyncio.get_event_loop()
    yield loop
    loop.close()
