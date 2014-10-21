import shelve
GRAVEYARD_FILEPATH = "save/.graveyard"

def append(player):
    # Append player to graveyard

    data = (str(player.name)
           ,str(player.fighter.level)
           ,str(player.dlevel)
           ,str(player.fighter.job)
           )

    file = shelve.open(GRAVEYARD_FILEPATH, 'w')
    file["characters"].append(data)
    file.close()

def load():
    # Load players from graveyard

    file = shelve.open(GRAVEYARD_FILEPATH)
    data = file["characters"]
    file.close()
    return data
