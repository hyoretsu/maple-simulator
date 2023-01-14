import { Equipment } from '@prisma/client';
import Image from 'next/image';
import { useMemo, useState } from 'react';

import Button from '@components/Button';
import Window from '@components/Window';

import { useCharInfo, useEquips, useFuncs } from '@context/char';
import { useFetch } from '@hooks/index';
import api from '@services/api';

import Arrow from '@assets/Arrow.svg';

import {
    Background,
    BottomSection,
    EquipChooser,
    EquipChooserSlot,
    EquipSlots,
    ExtraButtons,
    MiscButtons,
    ScrollDiv,
    Slot,
    Tab,
    TopBar,
} from './styles';

const EquipmentInventory: React.FC = () => {
    const equips = useEquips();
    const { job } = useCharInfo();
    const { updateEquips } = useFuncs();

    const [chooserEquipType, setChooserEquipType] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    // Having 'equips' in the dependency array synchronizes/awaits changes
    const { data } = useFetch(['/equips/find', equips], api, {
        id: Object.values(equips).map(equip => equip.id),
    });
    const usedEquips = useMemo<Record<string, Equipment | never>>(() => {
        if (!data) return [];

        const equipsObject = {};

        (data as Equipment[]).forEach(equip => {
            if (equip.type === 'Pendant' || equip.type === 'Ring') {
                Object.entries(equips)
                    .filter(([key]) => key.match(/pendant|ring\d/))
                    .forEach(([key, value]) => {
                        if (value.id === equip.id) Object.assign(equipsObject, { [key]: equip });
                    });
            } else if (equip.type === 'Eye Accessory' || equip.type === 'Face Accessory') {
                Object.assign(equipsObject, {
                    [equip.type.toLowerCase().replace(' accessory', 'Acc')]: equip,
                });
            } else if (equip.type === 'Mechanical Heart') {
                Object.assign(equipsObject, { heart: equip });
            } else {
                Object.assign(equipsObject, { [equip.type.toLowerCase()]: equip });
            }
        });

        return equipsObject;
    }, [data, equips]);

    const showChooser = (type: string) => {
        setChooserEquipType(type);

        setModalVisible(true);
    };

    const closeChooser = () => {
        setChooserEquipType('');

        setModalVisible(false);
    };

    const { data: chooserData } = useFetch(
        // @ts-ignore
        // Having 'chooserEquipType' in the dependency array makes for better UX by not showing previous results
        chooserEquipType ? ['/equips/filter', chooserEquipType] : null,
        api,
        {
            job,
            type: chooserEquipType.split(/\d/)[0],
        },
    );
    const chooserEquips = useMemo(() => (chooserData as Equipment[]) || [], [chooserData]);

    return (
        <Window title="Equipment Inventory" size={[232, 354]}>
            {isModalVisible && (
                <EquipChooser onClose={closeChooser}>
                    <ScrollDiv>
                        {chooserEquips.map(equip => (
                            <EquipChooserSlot key={equip.id}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        updateEquips(chooserEquipType, equip.id);
                                        closeChooser();
                                    }}
                                >
                                    <Image
                                        src={equip.icon}
                                        alt={equip.name}
                                        title={equip.name}
                                        width={equip.iconWidth}
                                        height={equip.iconHeight}
                                    />
                                </button>
                            </EquipChooserSlot>
                        ))}
                    </ScrollDiv>
                </EquipChooser>
            )}

            <Background job={job}>
                <TopBar>
                    <Tab active>Equip</Tab>
                    <Tab>Cash</Tab>
                    <Tab>Pet</Tab>
                    <Tab>Ad</Tab>
                </TopBar>
                <EquipSlots>
                    <div>
                        <Slot
                            background="#a98"
                            onClick={() => {
                                showChooser('Ring4');
                            }}
                        >
                            <span>Ring</span>
                            <Image
                                src={usedEquips.ring4?.icon}
                                alt={usedEquips.ring4?.name}
                                width={usedEquips.ring4?.iconWidth}
                                height={usedEquips.ring4?.iconHeight}
                            />
                        </Slot>
                        <Slot
                            background="#a98"
                            onClick={() => {
                                showChooser('Ring3');
                            }}
                        >
                            <span>Ring</span>
                            <Image
                                src={usedEquips.ring3?.icon}
                                alt={usedEquips.ring3?.name}
                                width={usedEquips.ring3?.iconWidth}
                                height={usedEquips.ring3?.iconHeight}
                            />
                        </Slot>
                        <Slot
                            background="#a98"
                            onClick={() => {
                                showChooser('Ring2');
                            }}
                        >
                            <span>Ring</span>
                            <Image
                                src={usedEquips.ring2?.icon}
                                alt={usedEquips.ring2?.name}
                                width={usedEquips.ring2?.iconWidth}
                                height={usedEquips.ring2?.iconHeight}
                            />
                        </Slot>
                        <Slot
                            background="#a98"
                            onClick={() => {
                                showChooser('Ring1');
                            }}
                        >
                            <span>Ring</span>
                            <Image
                                src={usedEquips.ring1?.icon}
                                alt={usedEquips.ring1?.name}
                                width={usedEquips.ring1?.iconWidth}
                                height={usedEquips.ring1?.iconHeight}
                            />
                        </Slot>
                        <Slot
                            background="#999"
                            onClick={() => {
                                showChooser('Pocket');
                            }}
                        >
                            <span>Pocket</span>
                            <Image
                                src={usedEquips.pocket?.icon}
                                alt={usedEquips.pocket?.name}
                                width={usedEquips.pocket?.iconWidth}
                                height={usedEquips.pocket?.iconHeight}
                            />
                        </Slot>
                        <Slot background="#999">
                            <span>Book</span>
                            <Image
                                src={usedEquips.book?.icon}
                                alt={usedEquips.book?.name}
                                width={usedEquips.book?.iconWidth}
                                height={usedEquips.book?.iconHeight}
                            />
                        </Slot>
                    </div>
                    <div>
                        <Slot style={{ cursor: 'default' }} />
                        <Slot
                            background="#8ab"
                            onClick={() => {
                                showChooser('Pendant2');
                            }}
                        >
                            <span>Pendant</span>
                            <br />
                            <span style={{ fontSize: '0.85em' }}>©</span>
                            <Image
                                src={usedEquips.pendant2?.icon}
                                alt={usedEquips.pendant2?.name}
                                width={usedEquips.pendant2?.iconWidth}
                                height={usedEquips.pendant2?.iconHeight}
                            />
                        </Slot>
                        <Slot
                            background="#8ab"
                            onClick={() => {
                                showChooser('Pendant1');
                            }}
                        >
                            <span>Pendant</span>
                            <Image
                                src={usedEquips.pendant1?.icon}
                                alt={usedEquips.pendant1?.name}
                                width={usedEquips.pendant1?.iconWidth}
                                height={usedEquips.pendant1?.iconHeight}
                            />
                        </Slot>
                        <Slot
                            background="#666"
                            onClick={() => {
                                showChooser('Weapon');
                            }}
                        >
                            <span>Weapon</span>
                            <Image
                                src={usedEquips.weapon?.icon}
                                alt={usedEquips.weapon?.name}
                                width={usedEquips.weapon?.iconWidth}
                                height={usedEquips.weapon?.iconHeight}
                            />
                        </Slot>
                        <Slot
                            background="#999"
                            onClick={() => {
                                showChooser('Belt');
                            }}
                        >
                            <span>Belt</span>
                            <Image
                                src={usedEquips.belt?.icon}
                                alt={usedEquips.belt?.name}
                                width={usedEquips.belt?.iconWidth}
                                height={usedEquips.belt?.iconHeight}
                            />
                        </Slot>
                        <Slot style={{ cursor: 'default' }} />
                    </div>
                    <div>
                        <Slot
                            background="#999"
                            onClick={() => {
                                showChooser('Hat');
                            }}
                        >
                            <span>Hat</span>
                            <Image
                                src={usedEquips.hat?.icon}
                                alt={usedEquips.hat?.name}
                                width={usedEquips.hat?.iconWidth}
                                height={usedEquips.hat?.iconHeight}
                            />
                        </Slot>
                        <Slot
                            background="#999"
                            onClick={() => {
                                showChooser('Face Accessory');
                            }}
                        >
                            <span>Face</span>
                            <Image
                                src={usedEquips.faceAcc?.icon}
                                alt={usedEquips.faceAcc?.name}
                                width={usedEquips.faceAcc?.iconWidth}
                                height={usedEquips.faceAcc?.iconHeight}
                            />
                        </Slot>
                        <Slot
                            background="#999"
                            onClick={() => {
                                showChooser('Eye Accessory');
                            }}
                        >
                            <span>Eye</span>
                            <br />
                            <span>Acc</span>
                            <Image
                                src={usedEquips.eyeAcc?.icon}
                                alt={usedEquips.eyeAcc?.name}
                                width={usedEquips.eyeAcc?.iconWidth}
                                height={usedEquips.eyeAcc?.iconHeight}
                            />
                        </Slot>
                        <Slot
                            background="#999"
                            onClick={() => {
                                showChooser('Top');
                            }}
                        >
                            <span>Top</span>
                            <Image
                                src={usedEquips.top?.icon}
                                alt={usedEquips.top?.name}
                                width={usedEquips.top?.iconWidth}
                                height={usedEquips.top?.iconHeight}
                            />
                        </Slot>
                        <Slot
                            background="#999"
                            onClick={() => {
                                showChooser('Bottom');
                            }}
                        >
                            <span>Bottom</span>
                            <Image
                                src={usedEquips.bottom?.icon}
                                alt={usedEquips.bottom?.name}
                                width={usedEquips.bottom?.iconWidth}
                                height={usedEquips.bottom?.iconHeight}
                            />
                        </Slot>
                        <Slot
                            background="#999"
                            onClick={() => {
                                showChooser('Shoes');
                            }}
                        >
                            <span>Shoes</span>
                            <Image
                                src={usedEquips.shoes?.icon}
                                alt={usedEquips.shoes?.name}
                                width={usedEquips.shoes?.iconWidth}
                                height={usedEquips.shoes?.iconHeight}
                            />
                        </Slot>
                    </div>
                    <div>
                        <Slot style={{ cursor: 'default' }} />
                        <Slot style={{ cursor: 'default' }} />
                        <Slot
                            background="#999"
                            onClick={() => {
                                showChooser('Ear');
                            }}
                        >
                            <span>Ear</span>
                            <br />
                            <span>Acc</span>
                            <Image
                                src={usedEquips.earrings?.icon}
                                alt={usedEquips.earrings?.name}
                                width={usedEquips.earrings?.iconWidth}
                                height={usedEquips.earrings?.iconHeight}
                            />
                        </Slot>
                        <Slot
                            background="#999"
                            onClick={() => {
                                showChooser('Shoulder');
                            }}
                            style={{ fontSize: '0.4em' }}
                        >
                            <span>Shoulder</span>
                            <Image
                                src={usedEquips.shoulder?.icon}
                                alt={usedEquips.shoulder?.name}
                                width={usedEquips.shoulder?.iconWidth}
                                height={usedEquips.shoulder?.iconHeight}
                            />
                        </Slot>
                        <Slot
                            background="#999"
                            onClick={() => {
                                showChooser('Gloves');
                            }}
                        >
                            <span>Gloves</span>
                            <Image
                                src={usedEquips.gloves?.icon}
                                alt={usedEquips.gloves?.name}
                                width={usedEquips.gloves?.iconWidth}
                                height={usedEquips.gloves?.iconHeight}
                            />
                        </Slot>
                        <Slot
                            background="#889"
                            onClick={() => {
                                showChooser('Android');
                            }}
                        >
                            <span>Android</span>
                            <Image
                                src={usedEquips.android?.icon}
                                alt={usedEquips.android?.name}
                                width={usedEquips.android?.iconWidth}
                                height={usedEquips.android?.iconHeight}
                            />
                        </Slot>
                    </div>
                    <div>
                        <Slot
                            background="#8ab"
                            onClick={() => {
                                showChooser('Emblem');
                            }}
                        >
                            <span>Emblem</span>
                            <Image
                                src={usedEquips.emblem?.icon}
                                alt={usedEquips.emblem?.name}
                                width={usedEquips.emblem?.iconWidth}
                                height={usedEquips.emblem?.iconHeight}
                            />
                        </Slot>
                        <Slot
                            background="#8ab"
                            onClick={() => {
                                showChooser('Badge');
                            }}
                        >
                            <span>Badge</span>
                            <Image
                                src={usedEquips.badge?.icon}
                                alt={usedEquips.badge?.name}
                                width={usedEquips.badge?.iconWidth}
                                height={usedEquips.badge?.iconHeight}
                            />
                        </Slot>
                        <Slot
                            background="#8ab"
                            onClick={() => {
                                showChooser('Medal');
                            }}
                        >
                            <span>Medal</span>
                            <Image
                                src={usedEquips.medal?.icon}
                                alt={usedEquips.medal?.name}
                                width={usedEquips.medal?.iconWidth}
                                height={usedEquips.medal?.iconHeight}
                            />
                        </Slot>
                        <Slot
                            background="#666"
                            onClick={() => {
                                showChooser('Secondary');
                            }}
                        >
                            <span>Sub</span>
                            <br />
                            <span>Weapon</span>
                            <Image
                                src={usedEquips.secondary?.icon}
                                alt={usedEquips.secondary?.name}
                                width={usedEquips.secondary?.iconWidth}
                                height={usedEquips.secondary?.iconHeight}
                            />
                        </Slot>
                        <Slot
                            background="#999"
                            onClick={() => {
                                showChooser('Cape');
                            }}
                        >
                            <span>Cape</span>
                            <Image
                                src={usedEquips.cape?.icon}
                                alt={usedEquips.cape?.name}
                                width={usedEquips.cape?.iconWidth}
                                height={usedEquips.cape?.iconHeight}
                            />
                        </Slot>
                        <Slot
                            background="#889"
                            onClick={() => {
                                showChooser('Mechanical Heart');
                            }}
                        >
                            <span>Heart</span>
                            <Image
                                src={usedEquips.heart?.icon}
                                alt={usedEquips.heart?.name}
                                width={usedEquips.heart?.iconWidth}
                                height={usedEquips.heart?.iconHeight}
                            />
                        </Slot>
                    </div>
                </EquipSlots>
                <BottomSection>
                    <ExtraButtons>
                        <Button
                            border="#5f91a8"
                            colors={['#33ddff', '#1199cc']}
                            size={[49, 13]}
                            style={{ marginRight: 'auto' }}
                        >
                            <Arrow style={{ transform: 'rotate(-90deg)' }} />
                            <span>Weapon</span>
                        </Button>
                        <Button
                            border="#5f91a8"
                            colors={['#33ddff', '#1199cc']}
                            size={[55, 13]}
                            style={{ marginRight: 2 }}
                        >
                            <span>Sacred</span>
                            <Arrow style={{ transform: 'rotate(90deg)' }} />
                        </Button>
                        <Button border="#5f91a8" colors={['#33ddff', '#1199cc']} size={[47, 13]}>
                            <span>Arcane</span>
                            <Arrow style={{ transform: 'rotate(90deg)' }} />
                        </Button>
                    </ExtraButtons>
                    <MiscButtons>
                        <Button border="#e79148" colors={['#ffd556', '#ee930f']} size={[55, 16]}>
                            <span>Effect</span>
                        </Button>
                        <Button
                            border="#e79148"
                            colors={['#ffd556', '#ee930f']}
                            size={[55, 16]}
                            style={{ marginLeft: 2 }}
                        >
                            <span>Salon</span>
                        </Button>
                        <Button
                            border="#e79148"
                            colors={['#ffd556', '#ee930f']}
                            size={[55, 16]}
                            style={{ marginLeft: 'auto' }}
                        >
                            <span>Vessel</span>
                        </Button>
                    </MiscButtons>
                </BottomSection>
            </Background>
        </Window>
    );
};

export default EquipmentInventory;
