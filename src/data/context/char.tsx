import React, { PropsWithChildren, useEffect, useState } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

type CoreStats = {
    hp: number;
    mp: number;
};

type CharStats = {
    ap: number;
    str: number;
    dex: number;
    int: number;
    luk: number;
};

interface CharInfo {
    name: string;
    level: number;
    exp: number;
    job: string;
    guild: string;
    fame: number;
}

interface Char extends CharInfo {
    stats: CoreStats & CharStats;
}

const CharContext = createContext({} as Char);

const CharProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [charInfo, setCharInfo] = useState({
        name: 'Default',
        level: 1,
        exp: 0,
        job: 'Beginner',
        guild: '',
        fame: 0,
        stats: {
            hp: 50,
            mp: 5,
            ap: 0,
            str: 4,
            dex: 4,
            int: 4,
            luk: 4,
        },
    });

    useEffect(() => {
        const storedInfo = localStorage.getItem('@MapleSimulator:char_info');
        if (storedInfo === null) {
            localStorage.setItem('@MapleSimulator:char_info', JSON.stringify(charInfo));

            return;
        }

        setCharInfo(JSON.parse(storedInfo));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <CharContext.Provider value={charInfo}>{children}</CharContext.Provider>;
};

const useCharInfo = (): CharInfo => {
    const context = useContextSelector(CharContext, char => ({
        name: char.name,
        level: char.level,
        exp: char.exp,
        job: char.job,
        guild: char.guild,
        fame: char.fame,
    }));
    if (!context) {
        throw new Error('useChar must be used within a CharProvider');
    }

    return context;
};

const useExp = (): number => {
    const context = useContextSelector(CharContext, char => char.exp);
    if (context === undefined) {
        throw new Error('useExp must be used within a CharProvider');
    }

    return context;
};

const useCoreStats = (): CoreStats => {
    const context = useContextSelector(CharContext, char => ({
        hp: char.stats.hp,
        mp: char.stats.mp,
    }));
    if (!context) {
        throw new Error('useStats must be used within a CharProvider');
    }

    return context;
};

const useStats = (): CharStats => {
    const context = useContextSelector(CharContext, char => ({
        ap: char.stats.ap,
        str: char.stats.str,
        dex: char.stats.dex,
        int: char.stats.int,
        luk: char.stats.luk,
    }));
    if (!context) {
        throw new Error('useStats must be used within a CharProvider');
    }

    return context;
};

export { CharProvider, useCharInfo, useExp, useCoreStats, useStats };
