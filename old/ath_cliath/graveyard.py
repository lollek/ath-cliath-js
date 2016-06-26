import shelve
import os
import os.path

GRAVEYARD_FILEPATH = "save/.graveyard"
GRAVEYARD_KEY = "characters"

def save(player):
    # Append player to graveyard

    data = [(str(player.name)
           ,player.fighter.level
           ,player.dlevel
           ,str(player.fighter.job)
           )]

    file = shelve.open(GRAVEYARD_FILEPATH)
    if file.has_key(GRAVEYARD_KEY):
        data = file[GRAVEYARD_KEY] + data

    file[GRAVEYARD_KEY] = data
    file.close()

def load(items):
    # Load the top n players from graveyard, the list is sorted by score

    if not os.path.isfile(GRAVEYARD_FILEPATH):
        return []

    file = shelve.open(GRAVEYARD_FILEPATH)
    data = file["characters"]
    file.close()

    data.sort(key=lambda elem: (elem[2], elem[1]), reverse=True)
    return data[:items]
