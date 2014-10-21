import shelve
GRAVEYARD_FILEPATH = "save/.graveyard"

def append(player):
    data = (str(player.name)
           ,str(player.fighter.level)
           ,str(player.dlevel)
           ,str(player.fighter.job)
           )

    file = shelve.open(GRAVEYARD_FILEPATH, 'w')
    file['characters'].append(data)
    file.close()
