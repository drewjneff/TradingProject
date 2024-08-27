import React, { useState, useEffect, useRef } from 'react';
import { Combobox, InputBase, useCombobox } from '@mantine/core';
import './FilterDropdown.less';

function FilterDropdown({ optionsArr, setSelectedSymbol }) {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [data, setData] = useState(optionsArr || ['']);
    const [value, setValue] = useState(null);
    const [search, setSearch] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (optionsArr) {
            setData(optionsArr);
        }
    }, [optionsArr]);

    useEffect(() => {
        setSelectedSymbol(value);
    }, [value, setSelectedSymbol]);

    const filteredOptions = data.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase().trim())
    );

    const options = filteredOptions.map((item) => (
        <Combobox.Option value={item} key={item} className="combobox-option">
            {item}
        </Combobox.Option>
    ));

    const handleSelectValue = (val) => {
        if (val === '$create') {
            setData((current) => [...current, search]);
            setValue(search);
        } else {
            setValue(val);
            setSearch(val);
        }
        combobox.closeDropdown();
        setTimeout(() => {
            inputRef.current.blur();
        }, 0);
    }

    return (
        <Combobox
            store={combobox}
            withinPortal={false}
            onOptionSubmit={handleSelectValue}
            classNames={{
                dropdown: 'combobox-dropdown',
            }}
        >
            <Combobox.Target>
                <InputBase
                    ref={inputRef}
                    value={search}
                    onChange={(event) => {
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                        setSearch(event.currentTarget.value.toUpperCase());
                    }}
                    onClick={() => {combobox.openDropdown(); setSearch(''); setValue('');}}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => {
                        combobox.closeDropdown();
                        setSearch(value || '');
                    }}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            handleSelectValue(search);
                            setTimeout(() => {
                                inputRef.current.blur();
                            }, 0);
                        }
                    }}
                    placeholder="Select Symbol.."
                    rightSectionPointerEvents="none"
                    classNames={{
                        input: 'input-base',
                    }}
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    {options}
                    {search.trim().length > 0 && !filteredOptions.includes(search.toUpperCase()) && (
                        <Combobox.Option value="$create" className="combobox-option">
                            Search for {search.toUpperCase()}
                        </Combobox.Option>
                    )}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}

export default FilterDropdown;
