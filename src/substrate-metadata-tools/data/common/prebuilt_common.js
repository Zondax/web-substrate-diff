const PrebuiltCommonTypes = {
  pd_Address_t: `
    pd_Address_e type;
    uint64_t idx;
    const uint8_t *idPtr;`,

  pd_CompactBalanceOf_t: `
    compactInt_t value;`,

  pd_VecHeader_t: `
    uint64_t _len;
    const uint8_t* _ptr;
    uint64_t _lenBuffer;`,

  pd_NonZeroU64_t: `
    pd_u64_t value;`,

  pd_AccountId_t: `
    const uint8_t *_ptr;`,

  pd_Hash_t: `
    const uint8_t *_ptr;`,

  pd_CallHashOf_t: `
    const uint8_t *_ptr;`,

  pd_Keys_t: `
    const uint8_t *_ptr;`,

  pd_BalanceOf_t: `
    pd_Balance_t value;`,

  pd_Balance_t: `
    const uint8_t *_ptr;`,

  pd_Bytes_t: `
    uint64_t _len;
    const uint8_t *_ptr;`,

  pd_CollatorId_t: `
    pd_Hash_t value;`,

  pd_Conviction_t: `
    uint8_t value;`,

  pd_ProxyType_t: `
    uint8_t value;`,

  pd_Data_t: `
    uint8_t type;
    const uint8_t *_ptr;
    uint8_t _len;`,

  pd_EcdsaSignature_t: `
    const uint8_t *_ptr;`,

  pd_EraIndex_t: `
    uint32_t value;`,

  pd_EthereumAddress_t: `
    const uint8_t *_ptr;`,

  pd_IdentityInfo_t: `
    // https://github.com/paritytech/substrate/blob/effe489951d1edab9d34846b1eefdfaf9511dab9/frame/identity/src/lib.rs#L276
    pd_VecTupleDataData_t additional;
    pd_Data_t display;
    pd_Data_t legal;
    pd_Data_t web;
    pd_Data_t riot;
    pd_Data_t email;
    pd_Optionu8_array_20_t pgp_fingerprint;
    pd_Data_t image;
    pd_Data_t twitter;`,

  pd_Key_t: `
    const uint8_t *_ptr;`,

  pd_KeyValue_t: `
    const uint8_t *_ptr;`,

  pd_OptionBalanceOfBalanceOfBlockNumber_t: `
    uint8_t some;
    pd_BalanceOf_t balance1;
    pd_BalanceOf_t balance2;
    pd_BlockNumber_t blockNumber;`,

  pd_TupleBalanceOfBalanceOfBlockNumber_t: `
    pd_BalanceOf_t balance1;
    pd_BalanceOf_t balance2;
    pd_BlockNumber_t blockNumber;`,

  pd_TupleDataData_t: `
    pd_Data_t data1;
    pd_Data_t data2;`,

  pd_ParaInfo_t: `
    uint8_t scheduling;     //pd_ParaScheduling_t
    // 0 - Always
    // 1 - Dynamic`,

  pd_ReferendumIndex_t: `
    uint32_t value;`,

  pd_RegistrarIndex_t: `
    uint32_t value;`,

  pd_RewardDestination_t: `
    uint8_t value;`,

  pd_Signature_t: `
    const uint8_t *_ptr;`,

  pd_ValidatorPrefs_t: `
    pd_CompactPerBill_t commission;`,

  pd_Vote_t: `
    pd_bool_t aye;
    pd_Conviction_t conviction;`,

  pd_u8_array_20_t: `
    const uint8_t *_ptr;`,

  pd_u8_array_32_t: `
    const uint8_t *_ptr;`,

  pd_Perbill_t: `
    uint32_t value;`,

  pd_AccountIndex_t: `
    uint32_t value;`,

  pd_AccountVoteSplit_t: `
    pd_BalanceOf_t aye;
    pd_BalanceOf_t nay;`,

  pd_AccountVoteStandard_t: `
    pd_Vote_t vote;
    pd_BalanceOf_t balance;`,

  pd_AccountVote_t: `
    uint8_t value;
     union {
        pd_AccountVoteStandard_t voteStandard;
        pd_AccountVoteSplit_t voteSplit;
    };`,

  pd_VestingInfo_t: `
    pd_BalanceOf_t locked;
    pd_BalanceOf_t per_block;
    pd_BlockNumber_t starting_block;`,

  pd_Timepoint_t: `
    pd_BlockNumber_t height;
    uint32_t index;`,

  pd_LookupSource_t: `
  	const uint8_t *_ptr;`,

  pd_TupleAccountIdu32_t: `
  	pd_AccountId_t accountId;
    pd_u32_t num;`,

  pd_Priority_t: `
  	uint32_t stream_id;
    pd_StreamDependency_t dependency;`,

  pd_MemberCount_t: `
    uint32_t value;`,

  pd_CompactPerBill_t: `
    compactInt_t value;`,

  pd_Percent_t: `
    compactInt_t value;`,

  pd_Moment_t: `
    uint64_t value;`,

  pd_Weight_t: `
    uint64_t value;`,

  pd_Gas_t: `
    uint64_t value;`,

  pd_Period_t: `
    uint64_t value;`,

  pd_ElectionSize_t: `
    compactInt_t validators;
    compactInt_t nominators;`,

  pd_ValidatorIndex_t: `
    uint16_t value;`,

  pd_TupleIdentityIdbool_t: `
    pd_IdentityId_t identity;
    pd_bool_t val;`,

  pd_StreamDependency_t: `
    pd_u32_t dependency_id;
    uint8_t weight;
    pd_bool_t is_exclusive;`,

  pd_ChangesTrieConfiguration_t: `
  	pd_u32_t digest_interval;
    pd_u32_t digest_levels;`,

  pd_u128_t: `
    const uint8_t *_ptr;`,

  pd_Call_t: `
    pd_CallIndex_t callIndex;
    const uint8_t* _methodPtr;
    const uint32_t* _txVerPtr;`,

  pd_Proposal_t: `
    pd_Call_t call;`,

  pd_OpaqueCall_t: `
    pd_Call_t call;`,

  pd_VecCall_t: `
    uint64_t _len;
    const uint8_t* _ptr;
    uint64_t _lenBuffer;
    uint32_t callTxVersion;`,
}

const PrebuiltCommonReads = {
  pd_Call_t: `
    pd_Method_t* _method = NULL;
    CHECK_ERROR(_getNextFreeMethodSlot(c, &_method))
    if (_method == NULL) {
        return parser_unexpected_error;
    }

    CHECK_ERROR(_readCallImpl(c, v, _method))
    zb_check_canary();
    return parser_ok;`,

  pd_VecCall_t: `
    compactInt_t clen;
    pd_Call_t dummy;
    CHECK_PARSER_ERR(_readCompactInt(c, &clen));
    CHECK_PARSER_ERR(_getValue(&clen, &v->_len));
    v->_ptr = c->buffer + c->offset;
    v->_lenBuffer = c->offset;
    for (uint64_t i = 0; i < v->_len; i++ ) {
        CHECK_ERROR(_readCall(c, &dummy))
    }
    v->_lenBuffer = c->offset - v->_lenBuffer;
    v->callTxVersion = *dummy._txVerPtr;

    return parser_ok;`,

  pd_Proposal_t: `
    return _readCall(c, &v->call);`,

  pd_OpaqueCall_t: `
    // Encoded as Byte[], array size comes first
    uint8_t size;
    CHECK_ERROR(_readUInt8(c, &size))
    return _readCall(c, &v->call);`,

  pd_NonZeroU64_t: `
     return _readUInt64(c, &v->value);`,

  pd_VecHeader_t: `
    GEN_DEF_READVECTOR(Header)`,

  pd_Address_t: `
         CHECK_INPUT();
    // Based on
    // https://github.com/paritytech/substrate/blob/fc3adc87dc806237eb7371c1d21055eea1702be0/srml/indices/src/address.rs#L66

    uint8_t tmp;
    CHECK_ERROR(_readUInt8(c, &tmp));

    switch (tmp) {
        case 0xFF: {
            v->type = eAddressId;
            v->idPtr = c->buffer + c->offset;
            CTX_CHECK_AND_ADVANCE(c, 32);
            break;
        }
        case 0xFE: {
            compactInt_t ci;
            CHECK_ERROR(_readCompactInt(c, &ci));

            v->type = eAddressIndex;
            CHECK_ERROR(_getValue(&ci, &v->idx));

            if (v->idx <= 0xffffffffu) {
                return parser_unexpected_value;
            }
            break;
        }
        case 0xFD: {
            uint32_t tmpval;
            CHECK_ERROR(_readUInt32(c, &tmpval));
            v->type = eAddressIndex;
            v->idx = tmpval;
            if (v->idx <= 0xFFFF) {
                return parser_unexpected_value;
            }
            break;
        }
        case 0xFC: {
            uint16_t tmpval;
            CHECK_ERROR(_readUInt16(c, &tmpval));
            v->type = eAddressIndex;
            v->idx = tmpval;
            if (v->idx <= 0xEF) {
                return parser_unexpected_value;
            }
            break;
        }
        default:
            if (tmp <= 0xEF) {
                v->type = eAddressIndex;
                v->idx = tmp;
                return parser_ok;
            }

            return parser_unexpected_value;
    }

    return parser_ok;`,

  pd_CompactBalanceOf_t: `
    CHECK_INPUT();
    CHECK_ERROR(_readCompactInt(c, &v->value));
    return parser_ok;`,

  pd_AccountId_t: `
    GEN_DEF_READARRAY(32)`,

  pd_Hash_t: `
    GEN_DEF_READARRAY(32)`,

  pd_CallHashOf_t: `
    GEN_DEF_READARRAY(32)`,

  pd_BalanceOf_t: `
    return _readBalance(c, &v->value);`,

  pd_Balance_t: `
    GEN_DEF_READARRAY(16)`,

  pd_Bytes_t: `
    CHECK_INPUT()

    compactInt_t clen;
    CHECK_ERROR(_readCompactInt(c, &clen))
    CHECK_ERROR(_getValue(&clen, &v->_len))

    v->_ptr = c->buffer + c->offset;
    CTX_CHECK_AND_ADVANCE(c, v->_len);
    return parser_ok;`,

  pd_CollatorId_t: `
    return _readHash(c, &v->value);`,

  pd_Conviction_t: `
    CHECK_INPUT()

    CHECK_ERROR(_readUInt8(c, &v->value))
    if (v->value > 5) {
        return parser_value_out_of_range;
    }

    return parser_ok;`,

  pd_ProxyType_t: `
    CHECK_INPUT()

    CHECK_ERROR(_readUInt8(c, &v->value))
    if (v->value > 3) {
        return parser_value_out_of_range;
    }

    return parser_ok;`,

  pd_Data_t: `
    CHECK_INPUT();
    MEMZERO(v, sizeof(pd_Data_t));
    CHECK_ERROR(_readUInt8(c, (uint8_t *) &v->type))

    v->_ptr = NULL;
    v->_len = 0;

    // based on:
    // https://github.com/paritytech/substrate/blob/effe489951d1edab9d34846b1eefdfaf9511dab9/frame/identity/src/lib.rs#L139
    switch (v->type) {
        case Data_e_NONE: {
            v->_ptr = NULL;
            v->_len = 0;
            return parser_ok;
        }
        case Data_e_BLAKETWO256U8_32:
        case Data_e_SHA256_U8_32:
        case Data_e_KECCAK256_U8_32:
        case Data_e_SHATHREE256_U8_32:
            return parser_not_supported;
        default: {
            if (v->type > Data_e_NONE && v->type <= Data_e_RAW_VECU8) {
                const uint8_t bufferSize = ((uint8_t) v->type - 1);
                v->_ptr = c->buffer + c->offset;
                v->_len = bufferSize;
                CTX_CHECK_AND_ADVANCE(c, v->_len);
                return parser_ok;
            }
            return parser_not_supported;
        }
    }`,

  pd_EcdsaSignature_t: `
    GEN_DEF_READARRAY(65)`,

  pd_EraIndex_t: `
    return _readUInt32(c, &v->value);`,

  pd_EthereumAddress_t: `
    GEN_DEF_READARRAY(20)`,

  pd_IdentityInfo_t: `
    CHECK_ERROR(_readVecTupleDataData(c, &v->additional));
    CHECK_ERROR(_readData(c, &v->display));
    CHECK_ERROR(_readData(c, &v->legal));
    CHECK_ERROR(_readData(c, &v->web));
    CHECK_ERROR(_readData(c, &v->riot));
    CHECK_ERROR(_readData(c, &v->email));
    CHECK_ERROR(_readOptionu8_array_20(c, &v->pgp_fingerprint));
    CHECK_ERROR(_readData(c, &v->image));
    CHECK_ERROR(_readData(c, &v->twitter));
    return parser_ok;`,

  pd_Key_t: `
    GEN_DEF_READARRAY(32)`,

  pd_KeyValue_t: `
    GEN_DEF_READARRAY(32)`,

  pd_OptionBalanceOfBalanceOfBlockNumber_t: `
    CHECK_ERROR(_readUInt8(c, &v->some))
    if (v->some > 0) {
        CHECK_ERROR(_readBalanceOf(c, &v->balance1))
        CHECK_ERROR(_readBalanceOf(c, &v->balance2))
        CHECK_ERROR(_readBlockNumber(c, &v->blockNumber))
    }
    return parser_ok;`,

  pd_TupleBalanceOfBalanceOfBlockNumber_t: `
    CHECK_ERROR(_readBalanceOf(c, &v->balance1))
    CHECK_ERROR(_readBalanceOf(c, &v->balance2))
    CHECK_ERROR(_readBlockNumber(c, &v->blockNumber))
    return parser_ok;`,

  pd_TupleDataData_t: `
    CHECK_INPUT();
    CHECK_ERROR(_readData(c, &v->data1))
    CHECK_ERROR(_readData(c, &v->data2))
    return parser_ok;`,

  pd_ParaInfo_t: `
    CHECK_INPUT();
    CHECK_ERROR(_readUInt8(c, &v->scheduling))
    return parser_ok;`,

  pd_ReferendumIndex_t: `
    return _readUInt32(c, &v->value);`,

  pd_RegistrarIndex_t: `
    return _readUInt32(c, &v->value);`,

  pd_RewardDestination_t: `
    CHECK_INPUT();

    CHECK_ERROR(_readUInt8(c, &v->value))
    if (v->value > 2) {
        return parser_value_out_of_range;
    }

    return parser_ok;`,

  pd_Signature_t: `
    GEN_DEF_READARRAY(64)`,

  pd_ValidatorPrefs_t: `
    CHECK_INPUT();
    return _readCompactPerBill(c, &v->commission);`,

  pd_Vote_t: `
    CHECK_INPUT();
    uint8_t b;
    CHECK_ERROR(_readUInt8(c, &b))

    v->aye = (b & 0x80u) >> 7u;
    v->conviction.value = b & 0x7Fu;

    if (v->conviction.value > 5) {
        return parser_value_out_of_range;
    }

    return parser_ok;`,

  pd_u8_array_20_t: `
    GEN_DEF_READARRAY(20)`,

  pd_u8_array_32_t: `
    GEN_DEF_READARRAY(32)`,

  pd_Perbill_t: `
    return _readUInt32(c, &v->value);`,

  pd_AccountIndex_t: `
    return _readUInt32(c, &v->value);`,

  pd_AccountVote_t: `
    CHECK_INPUT();
    CHECK_ERROR(_readUInt8(c, &v->value))

    switch (v->value) {
        case 0:
            CHECK_INPUT();
            CHECK_ERROR(_readAccountVoteStandard(c, &v->voteStandard))
            break;
        case 1:
            CHECK_INPUT();
            CHECK_ERROR(_readAccountVoteSplit(c, &v->voteSplit))
            break;
        default:
            break;
    }

    return parser_ok;`,

  pd_AccountVoteStandard_t: `
    CHECK_ERROR(_readVote(c, &v->vote));
    CHECK_ERROR(_readBalanceOf(c, &v->balance));
    return parser_ok;`,

  pd_AccountVoteSplit_t: `
    CHECK_ERROR(_readBalanceOf(c, &v->aye));
    CHECK_ERROR(_readBalanceOf(c, &v->nay));
    return parser_ok;`,

  pd_VestingInfo_t: `
    CHECK_ERROR(_readBalanceOf(c, &v->locked))
    CHECK_ERROR(_readBalanceOf(c, &v->per_block))
    CHECK_ERROR(_readBlockNumber(c, &v->starting_block))
    return parser_ok;`,

  pd_Timepoint_t: `
    CHECK_ERROR(_readBlockNumber(c, &v->height))
    CHECK_ERROR(_readu32(c, &v->index))
    return parser_ok;`,

  pd_StreamDependency_t: `
    CHECK_ERROR(_readu32(c, &v->dependency_id))
    CHECK_ERROR(_readUInt8(c, &v->weight))
    CHECK_ERROR(_readbool(c, &v->is_exclusive))
    return parser_ok;`,

  pd_LookupSource_t: `  
    GEN_DEF_READARRAY(32)`,

  pd_TupleAccountIdu32_t: `
    CHECK_ERROR(_readAccountId(c, &v->accountId))
    CHECK_ERROR(_readu32(c, &v->num))
    return parser_ok;`,

  pd_ChangesTrieConfiguration_t: `
    CHECK_ERROR(_readu32(c, &v->digest_interval))
    CHECK_ERROR(_readu32(c, &v->digest_levels))
    return parser_ok;`,

  pd_Priority_t: `
    CHECK_ERROR(_readu32(c, &v->stream_id))
    CHECK_ERROR(_readStreamDependency(c, &v->dependency))
    return parser_ok;`,

  pd_TupleIdentityIdbool_t: `
    CHECK_ERROR(_readIdentityId(c, &v->identity))
    CHECK_ERROR(_readBool(c, &v->val))
    return parser_ok;`,

  pd_MemberCount_t: `
    return _readUInt32(c, &v->value);`,

  pd_CompactPerBill_t: `
    return _readCompactInt(c, &v->value);`,

  pd_Percent_t: `
    return _readCompactInt(c, &v->value);`,

  pd_Moment_t: `
    return _readUInt64(c, &v->value);`,

  pd_Weight_t: `
    return _readUInt64(c, &v->value);`,

  pd_Gas_t: `
    return _readUInt64(c, &v->value);`,

  pd_Period_t: `
    return _readUInt64(c, &v->value);`,

  pd_ElectionSize_t: `
    CHECK_ERROR(_readCompactInt(c, &v->validators));
    CHECK_ERROR(_readCompactInt(c, &v->nominators));
    return parser_ok;`,

  pd_ValidatorIndex_t: `
    CHECK_INPUT()
    CHECK_ERROR(_readUInt16(c, &v->value))
    return parser_ok;`,

  pd_u128_t: `
    GEN_DEF_READARRAY(16)`,
}

const PrebuiltCommonToString = {
  pd_NonZeroU64_t: `
     return _toStringu64(&v->value, outValue, outValueLen, pageIdx, pageCount);`,

  pd_VecHeader_t: `
    GEN_DEF_TOSTRING_VECTOR(Header)`,

  pd_Address_t: `
    MEMZERO(outValue, outValueLen);
    if (v == NULL) {
        return parser_ok;
    }

    *pageCount = 1;
    switch (v->type) {
        case eAddressIndex:
            return parser_not_supported;
        case eAddressId: {
            return _toStringPubkeyAsAddress(v->idPtr,
                                            outValue, outValueLen,
                                            pageIdx, pageCount);
        }
    }

    return parser_ok;`,

  pd_CompactBalanceOf_t: `
    CHECK_ERROR(_toStringCompactInt(&v->value, COIN_AMOUNT_DECIMAL_PLACES, 0, COIN_TICKER, outValue, outValueLen, pageIdx, pageCount))
    number_inplace_trimming(outValue);
    return parser_ok;`,

  pd_AccountId_t: `
    return _toStringPubkeyAsAddress(v->_ptr, outValue, outValueLen, pageIdx, pageCount);`,

  pd_BalanceOf_t: `
    return _toStringBalance(&v->value, outValue, outValueLen, pageIdx, pageCount);`,

  pd_Balance_t: `
    CLEAN_AND_CHECK()

    char bufferUI[200];
    MEMSET(outValue, 0, outValueLen);
    MEMSET(bufferUI, 0, sizeof(bufferUI));
    *pageCount = 1;

    uint8_t bcdOut[100];
    const uint16_t bcdOutLen = sizeof(bcdOut);

    bignumLittleEndian_to_bcd(bcdOut, bcdOutLen, v->_ptr, 16);
    if (!bignumLittleEndian_bcdprint(bufferUI, sizeof(bufferUI), bcdOut, bcdOutLen)) {
        return parser_unexpected_buffer_end;
    }

    // Format number
    if (intstr_to_fpstr_inplace(bufferUI, sizeof(bufferUI), COIN_AMOUNT_DECIMAL_PLACES) == 0){
        return parser_unexpected_value;
    }
    
    number_inplace_trimming(bufferUI);
    size_t size = strlen(bufferUI) + strlen(COIN_TICKER) + 2;
    char _tmpBuffer[200];
    MEMZERO(_tmpBuffer, sizeof(_tmpBuffer));
    strcat(_tmpBuffer, COIN_TICKER);
    strcat(_tmpBuffer, " ");
    strcat(_tmpBuffer, bufferUI);
    // print length: strlen(value) + strlen(COIN_TICKER) + strlen(" ") + nullChar
    MEMZERO(bufferUI, sizeof(bufferUI));
    snprintf(bufferUI, size, "%s", _tmpBuffer);

    pageString(outValue, outValueLen, bufferUI, pageIdx, pageCount);
    return parser_ok;`,

  pd_Bytes_t: `
    GEN_DEF_TOSTRING_ARRAY(v->_len);`,

  pd_CollatorId_t: `
    return _toStringHash(&v->value, outValue, outValueLen, pageIdx, pageCount);`,

  pd_Conviction_t: `
    CLEAN_AND_CHECK()

    *pageCount = 1;
    switch (v->value) {
        case 0:
            snprintf(outValue, outValueLen, "None");
            break;
        case 1:
            snprintf(outValue, outValueLen, "Locked1x");
            break;
        case 2:
            snprintf(outValue, outValueLen, "Locked2x");
            break;
        case 3:
            snprintf(outValue, outValueLen, "Locked3x");
            break;
        case 4:
            snprintf(outValue, outValueLen, "Locked4x");
            break;
        case 5:
            snprintf(outValue, outValueLen, "Locked5x");
            break;
        default:
            return parser_print_not_supported;
    }

    return parser_ok;`,

  pd_ProxyType_t: `
    CLEAN_AND_CHECK()

    *pageCount = 1;
    switch (v->value) {
        case 0:
            snprintf(outValue, outValueLen, "Any");
            break;
        case 1:
            snprintf(outValue, outValueLen, "NonTransfer");
            break;
        case 2:
            snprintf(outValue, outValueLen, "Governance");
            break;
        case 3:
            snprintf(outValue, outValueLen, "Staking");
            break;
        default:
            return parser_print_not_supported;
    }

    return parser_ok;`,

  pd_Data_t: `
    CLEAN_AND_CHECK()

    if (v->_ptr == NULL || v->_len == 0) {
        return parser_unexpected_value;
    }

    if (v->type > Data_e_NONE && v->type <= Data_e_RAW_VECU8) {
        const uint8_t bufferSize = ((uint8_t) v->type - 1);
        GEN_DEF_TOSTRING_ARRAY(bufferSize)
    }

    switch (v->type) {
        case Data_e_NONE:
            *pageCount = 1;
            snprintf(outValue, outValueLen, "None");
            return parser_ok;
        case Data_e_RAW_VECU8:
            // This should have been handled before (1..33)
            return parser_unexpected_value;
        case Data_e_BLAKETWO256U8_32:
        case Data_e_SHA256_U8_32:
        case Data_e_KECCAK256_U8_32:
        case Data_e_SHATHREE256_U8_32:
        default:
            break;
    }

    return parser_print_not_supported;`,

  pd_EcdsaSignature_t: `
    GEN_DEF_TOSTRING_ARRAY(65)`,

  pd_Hash_t: `
    GEN_DEF_TOSTRING_ARRAY(32)`,

  pd_CallHashOf_t: `
    GEN_DEF_TOSTRING_ARRAY(32)`,

  pd_EraIndex_t: `
    return _toStringu32(&v->value, outValue, outValueLen, pageIdx, pageCount);`,

  pd_EthereumAddress_t: `
    GEN_DEF_TOSTRING_ARRAY(20)`,

  pd_IdentityInfo_t: `
    CLEAN_AND_CHECK()

    // First measure number of pages
    uint8_t pages[9];
    CHECK_ERROR(_toStringVecTupleDataData(&v->additional, outValue, outValueLen, 0, &pages[0]))
    CHECK_ERROR(_toStringData(&v->display, outValue, outValueLen, 0, &pages[1]))
    CHECK_ERROR(_toStringData(&v->legal, outValue, outValueLen, 0, &pages[2]))
    CHECK_ERROR(_toStringData(&v->web, outValue, outValueLen, 0, &pages[3]))
    CHECK_ERROR(_toStringData(&v->riot, outValue, outValueLen, 0, &pages[4]))
    CHECK_ERROR(_toStringData(&v->email, outValue, outValueLen, 0, &pages[5]))
    CHECK_ERROR(_toStringOptionu8_array_20(&v->pgp_fingerprint, outValue, outValueLen, 0, &pages[6]))
    CHECK_ERROR(_toStringData(&v->image, outValue, outValueLen, 0, &pages[7]))
    CHECK_ERROR(_toStringData(&v->twitter, outValue, outValueLen, 0, &pages[8]))

    *pageCount = 0;
    for (uint8_t i = 0; i < (uint8_t) sizeof(pages); i++) {
        *pageCount += pages[i];
    }

    if (pageIdx > *pageCount) {
        return parser_display_idx_out_of_range;
    }

    if (pageIdx < pages[0]) {
        CHECK_ERROR(_toStringVecTupleDataData(&v->additional, outValue, outValueLen, pageIdx, &pages[0]))
        return parser_ok;
    }
    pageIdx -= pages[0];

    /////////
    /////////

    if (pageIdx < pages[1]) {
        CHECK_ERROR(_toStringData(&v->display, outValue, outValueLen, pageIdx, &pages[1]))
        return parser_ok;
    }
    pageIdx -= pages[1];

    /////////
    /////////

    if (pageIdx < pages[2]) {
        CHECK_ERROR(_toStringData(&v->legal, outValue, outValueLen, pageIdx, &pages[2]))
        return parser_ok;
    }
    pageIdx -= pages[2];

    /////////
    /////////

    if (pageIdx < pages[3]) {
        CHECK_ERROR(_toStringData(&v->web, outValue, outValueLen, pageIdx, &pages[3]))
        return parser_ok;
    }
    pageIdx -= pages[3];

    /////////
    /////////

    if (pageIdx < pages[4]) {
        CHECK_ERROR(_toStringData(&v->riot, outValue, outValueLen, pageIdx, &pages[4]))
        return parser_ok;
    }
    pageIdx -= pages[4];

    /////////
    /////////

    if (pageIdx < pages[5]) {
        CHECK_ERROR(_toStringData(&v->email, outValue, outValueLen, pageIdx, &pages[5]))
        return parser_ok;
    }
    pageIdx -= pages[5];

    /////////
    /////////

    if (pageIdx < pages[6]) {
        CHECK_ERROR(_toStringOptionu8_array_20(&v->pgp_fingerprint, outValue, outValueLen, pageIdx, &pages[6]))
        return parser_ok;
    }
    pageIdx -= pages[6];

    /////////
    /////////

    if (pageIdx < pages[7]) {
        CHECK_ERROR(_toStringData(&v->image, outValue, outValueLen, pageIdx, &pages[7]))
        return parser_ok;
    }
    pageIdx -= pages[7];

    /////////
    /////////

    if (pageIdx < pages[8]) {
        CHECK_ERROR(_toStringData(&v->twitter, outValue, outValueLen, pageIdx, &pages[8]))
        return parser_ok;
    }
    pageIdx -= pages[8];

    return parser_display_idx_out_of_range;`,

  pd_Key_t: `
    CLEAN_AND_CHECK()

    return parser_print_not_supported;`,

  pd_KeyValue_t: `
    CLEAN_AND_CHECK()

    return parser_print_not_supported;`,

  pd_OptionBalanceOfBalanceOfBlockNumber_t: `
    CLEAN_AND_CHECK()

    if (v->some == 0) {
        snprintf(outValue, outValueLen, "None");
        return parser_ok;
    }

    // Index + count pages
    uint8_t pages[3];
    CHECK_ERROR(_toStringBalanceOf(&v->balance1, outValue, outValueLen, 0, &pages[0]))
    CHECK_ERROR(_toStringBalanceOf(&v->balance2, outValue, outValueLen, 0, &pages[1]))
    CHECK_ERROR(_toStringBlockNumber(&v->blockNumber, outValue, outValueLen, 0, &pages[2]))

    *pageCount = pages[0] + pages[1] + pages[2];
    if (pageIdx > *pageCount) {
        return parser_display_idx_out_of_range;
    }

    if (pageIdx < pages[0]) {
        CHECK_ERROR(_toStringBalanceOf(&v->balance1, outValue, outValueLen, pageIdx, &pages[0]))
        return parser_ok;
    }
    pageIdx -= pages[0];

    //////
    if (pageIdx < pages[1]) {
        CHECK_ERROR(_toStringBalanceOf(&v->balance2, outValue, outValueLen, pageIdx, &pages[1]))
        return parser_ok;
    }
    pageIdx -= pages[1];

    //////
    if (pageIdx < pages[2]) {
        CHECK_ERROR(_toStringBlockNumber(&v->blockNumber, outValue, outValueLen, pageIdx, &pages[2]))
        return parser_ok;
    }

    return parser_display_idx_out_of_range;`,

  pd_ParaInfo_t: `
    CLEAN_AND_CHECK()

    switch (v->scheduling) {
        case 0:
            snprintf(outValue, outValueLen, "Scheduling: Always");
            break;
        case 1:
            snprintf(outValue, outValueLen, "Scheduling: Dynamic");
            break;
        default:
            snprintf(outValue, outValueLen, "Scheduling: %d", v->scheduling);
            break;
    }

    return parser_ok;`,

  pd_ReferendumIndex_t: `
    return _toStringu32(&v->value, outValue, outValueLen, pageIdx, pageCount);`,

  pd_RegistrarIndex_t: `
    return _toStringu32(&v->value, outValue, outValueLen, pageIdx, pageCount);`,

  pd_RewardDestination_t: `
    CLEAN_AND_CHECK()

    *pageCount = 1;
    switch (v->value) {
        case 0:
            snprintf(outValue, outValueLen, "Staked");
            break;
        case 1:
            snprintf(outValue, outValueLen, "Stash");
            break;
        case 2:
            snprintf(outValue, outValueLen, "Controller");
            break;
        default:
            return parser_print_not_supported;
    }

    return parser_ok;`,

  pd_Signature_t: `
    GEN_DEF_TOSTRING_ARRAY(64)`,

  pd_TupleBalanceOfBalanceOfBlockNumber_t: `
    CLEAN_AND_CHECK()

    // Index + count pages
    uint8_t pages[3];
    CHECK_ERROR(_toStringBalanceOf(&v->balance1, outValue, outValueLen, 0, &pages[0]))
    CHECK_ERROR(_toStringBalanceOf(&v->balance2, outValue, outValueLen, 0, &pages[1]))
    CHECK_ERROR(_toStringBlockNumber(&v->blockNumber, outValue, outValueLen, 0, &pages[2]))

    *pageCount = pages[0] + pages[1] + pages[2];
    if (pageIdx > *pageCount) {
        return parser_display_idx_out_of_range;
    }

    if (pageIdx < pages[0]) {
        CHECK_ERROR(_toStringBalanceOf(&v->balance1, outValue, outValueLen, pageIdx, &pages[0]))
        return parser_ok;
    }
    pageIdx -= pages[0];

    //////
    if (pageIdx < pages[1]) {
        CHECK_ERROR(_toStringBalanceOf(&v->balance2, outValue, outValueLen, pageIdx, &pages[1]))
        return parser_ok;
    }
    pageIdx -= pages[1];

    //////
    if (pageIdx < pages[2]) {
        CHECK_ERROR(_toStringBlockNumber(&v->blockNumber, outValue, outValueLen, pageIdx, &pages[2]))
        return parser_ok;
    }

    return parser_display_idx_out_of_range;`,

  pd_TupleDataData_t: `
    CLEAN_AND_CHECK()

    uint8_t pages[2];
    CHECK_ERROR(_toStringData(&v->data1, outValue, outValueLen, 0, &pages[0]))
    CHECK_ERROR(_toStringData(&v->data2, outValue, outValueLen, 0, &pages[1]))

    *pageCount = 0;
    for (uint8_t i = 0; i < (uint8_t) sizeof(pages); i++) {
        *pageCount += pages[i];
    }

    if (pageIdx > *pageCount) {
        return parser_display_idx_out_of_range;
    }

    if (pageIdx < pages[0]) {
        CHECK_ERROR(_toStringData(&v->data1, outValue, outValueLen, pageIdx, &pages[0]))
        return parser_ok;
    }
    pageIdx -= pages[0];

    /////////
    /////////

    if (pageIdx < pages[1]) {
        CHECK_ERROR(_toStringData(&v->data2, outValue, outValueLen, pageIdx, &pages[1]))
        return parser_ok;
    }
    pageIdx -= pages[1];

    return parser_display_idx_out_of_range;`,

  pd_ValidatorPrefs_t: `
    return _toStringCompactPerBill(&v->commission, outValue, outValueLen, pageIdx, pageCount);`,

  pd_Vote_t: `
    CLEAN_AND_CHECK()

    CHECK_PARSER_ERR(_toStringbool(&v->aye, outValue, outValueLen, pageIdx, pageCount));
    uint16_t offset = strlen(outValue);
    outValue[offset++] = ' ';
    CHECK_PARSER_ERR(_toStringConviction(&v->conviction,
                        outValue + offset,
                        outValueLen - offset,
                        pageIdx,
                        pageCount));
    *pageCount = 1;
    return parser_ok;`,

  pd_u8_array_20_t: `
    GEN_DEF_TOSTRING_ARRAY(20)`,

  pd_u8_array_32_t: `
    GEN_DEF_TOSTRING_ARRAY(32)`,

  pd_Perbill_t: `
    char bufferUI[100];
    char ratioBuffer[80];
    MEMSET(outValue, 0, outValueLen);
    MEMSET(ratioBuffer, 0, sizeof(ratioBuffer));
    MEMSET(bufferUI, 0, sizeof(bufferUI));
    *pageCount = 1;

    if (fpuint64_to_str(ratioBuffer, sizeof(ratioBuffer), v->value, 7) == 0) {
        return parser_unexpected_value;
    }

    snprintf(bufferUI, sizeof(bufferUI), "%s%%", ratioBuffer);
    pageString(outValue, outValueLen, bufferUI, pageIdx, pageCount);
    return parser_ok;`,

  pd_AccountIndex_t: `
    return _toStringu32(&v->value, outValue, outValueLen, pageIdx, pageCount);`,

  pd_AccountVote_t: `
    CLEAN_AND_CHECK()
    switch (v->value) {
        case 0:
            _toStringAccountVoteStandard(&v->voteStandard, outValue, outValueLen, pageIdx, pageCount);
            break;
        case 1:
            _toStringAccountVoteSplit(&v->voteSplit, outValue, outValueLen, pageIdx, pageCount);
            break;
        default:
           return parser_unexpected_value;
    }

    return parser_ok;`,

  pd_VestingInfo_t: `
  CLEAN_AND_CHECK()

  // Index + count pages
  uint8_t pages[3];
  CHECK_ERROR(_toStringBalanceOf(&v->locked, outValue, outValueLen, 0, &pages[0]))
  CHECK_ERROR(_toStringBalanceOf(&v->per_block, outValue, outValueLen, 0, &pages[1]))
  CHECK_ERROR(_toStringBlockNumber(&v->starting_block, outValue, outValueLen, 0, &pages[2]))

  *pageCount = pages[0] + pages[1] + pages[2];
  if (pageIdx > *pageCount) {
    return parser_display_idx_out_of_range;
  }

  if (pageIdx < pages[0]) {
    CHECK_ERROR(_toStringBalanceOf(&v->locked, outValue, outValueLen, pageIdx, &pages[0]))
    return parser_ok;
  }
  pageIdx -= pages[0];

  //////
  if (pageIdx < pages[1]) {
    CHECK_ERROR(_toStringBalanceOf(&v->per_block, outValue, outValueLen, pageIdx, &pages[1]))
    return parser_ok;
  }
  pageIdx -= pages[1];

  //////
  if (pageIdx < pages[2]) {
    CHECK_ERROR(_toStringBlockNumber(&v->starting_block, outValue, outValueLen, pageIdx, &pages[2]))
    return parser_ok;
  }

  return parser_display_idx_out_of_range;`,

  pd_Timepoint_t: `
  CLEAN_AND_CHECK()

  // Index + count pages
  uint8_t pages[2];
  CHECK_ERROR(_toStringBlockNumber(&v->height, outValue, outValueLen, 0, &pages[0]))
  CHECK_ERROR(_toStringu32(&v->index, outValue, outValueLen, 0, &pages[1]))

  *pageCount = pages[0] + pages[1];
  if (pageIdx > *pageCount) {
    return parser_display_idx_out_of_range;
  }

  if (pageIdx < pages[0]) {
    CHECK_ERROR(_toStringBlockNumber(&v->height, outValue, outValueLen, pageIdx, &pages[0]))
    return parser_ok;
  }
  pageIdx -= pages[0];

  //////
  if (pageIdx < pages[1]) {
    CHECK_ERROR(_toStringu32(&v->index, outValue, outValueLen, pageIdx, &pages[1]))
    return parser_ok;
  }

  return parser_display_idx_out_of_range;`,

  pd_StreamDependency_t: `
  CLEAN_AND_CHECK()

  // Index + count pages
  uint8_t pages[3];
  CHECK_ERROR(_toStringu32(&v->dependency_id, outValue, outValueLen, 0, &pages[0]))
  CHECK_ERROR(_toStringu16((const pd_u16_t *)&v->weight, outValue, outValueLen, 0, &pages[1]))
  CHECK_ERROR(_toStringbool(&v->is_exclusive, outValue, outValueLen, 0, &pages[2]))

  *pageCount = pages[0] + pages[1] + pages[2];
  if (pageIdx > *pageCount) {
    return parser_display_idx_out_of_range;
  }

  if (pageIdx < pages[0]) {
    CHECK_ERROR(_toStringu32(&v->dependency_id, outValue, outValueLen, pageIdx, &pages[0]))
    return parser_ok;
  }
  pageIdx -= pages[0];

  //////
  if (pageIdx < pages[1]) {
    CHECK_ERROR(_toStringu16((const pd_u16_t *)&v->weight, outValue, outValueLen, pageIdx, &pages[1]))
    return parser_ok;
  }
  pageIdx -= pages[1];

  //////
  if (pageIdx < pages[2]) {
    CHECK_ERROR(_toStringbool(&v->is_exclusive, outValue, outValueLen, pageIdx, &pages[2]))
    return parser_ok;
  }

  return parser_display_idx_out_of_range;`,

  pd_AccountVoteStandard_t: `
    CLEAN_AND_CHECK()
    // First measure number of pages
    uint8_t pages[3];

    pages[0] = 1;
    CHECK_ERROR(_toStringVote(&v->vote, outValue, outValueLen, 0, &pages[1]))
    CHECK_ERROR(_toStringBalanceOf(&v->balance, outValue, outValueLen, 0, &pages[2]));

    *pageCount = 0;
    for (uint8_t i = 0; i < (uint8_t) sizeof(pages); i++) {
        *pageCount += pages[i];
    }

    if (pageIdx > *pageCount) {
        return parser_display_idx_out_of_range;
    }

    if (pageIdx < pages[0]) {
        snprintf(outValue, outValueLen, "Standard");
        return parser_ok;
    }
    pageIdx -= pages[0];

    /////////
    /////////

    if (pageIdx < pages[1]) {
        CHECK_ERROR(_toStringVote(&v->vote, outValue, outValueLen, pageIdx, &pages[1]));
        return parser_ok;
    }
    pageIdx -= pages[1];

    /////////
    /////////

    if (pageIdx < pages[2]) {
        CHECK_ERROR(_toStringBalanceOf(&v->balance, outValue, outValueLen, pageIdx, &pages[2]));
        return parser_ok;
    }
    pageIdx -= pages[2];

    /////////
    /////////

    return parser_display_idx_out_of_range;`,

  pd_AccountVoteSplit_t: `
    CLEAN_AND_CHECK()
    // First measure number of pages
    uint8_t pages[3];

    pages[0] = 1;
    CHECK_ERROR(_toStringBalanceOf(&v->aye, outValue, outValueLen, 0, &pages[1]))
    CHECK_ERROR(_toStringBalanceOf(&v->nay, outValue, outValueLen, 0, &pages[2]));

    *pageCount = 0;
    for (uint8_t i = 0; i < (uint8_t) sizeof(pages); i++) {
        *pageCount += pages[i];
    }

    if (pageIdx < pages[0]) {
        snprintf(outValue, outValueLen, "Split");
        return parser_ok;
    }
    pageIdx -= pages[0];

    /////////
    /////////

    if (pageIdx < pages[1]) {
        CHECK_ERROR(_toStringBalanceOf(&v->aye, outValue, outValueLen, pageIdx, &pages[1]));
        return parser_ok;
    }
    pageIdx -= pages[1];

    /////////
    /////////

    if (pageIdx < pages[2]) {
        CHECK_ERROR(_toStringBalanceOf(&v->nay, outValue, outValueLen, pageIdx, &pages[2]));
        return parser_ok;
    }
    pageIdx -= pages[2];

    /////////
    /////////

    return parser_display_idx_out_of_range;`,

  pd_LookupSource_t: `
    return _toStringPubkeyAsAddress(v->_ptr, outValue, outValueLen, pageIdx, pageCount);`,

  pd_TupleAccountIdu32_t: `
    // Get all pages first
    uint8_t pages[2];
    CHECK_ERROR(_toStringAccountId(&v->accountId, outValue, outValueLen, 0, &pages[0]))
    CHECK_ERROR(_toStringu32(&v->num, outValue, outValueLen, 0, &pages[1]))

    *pageCount = pages[0] + pages[1];
    if (pageIdx > *pageCount) {
        return parser_display_idx_out_of_range;
    }

    if (pageIdx < pages[0]) {
        CHECK_ERROR(_toStringAccountId(&v->accountId, outValue, outValueLen, pageIdx, &pages[0]))
        return parser_ok;
    }
    pageIdx -= pages[0];

    if (pageIdx < pages[1]) {
        CHECK_ERROR(_toStringu32(&v->num, outValue, outValueLen, pageIdx, &pages[1]))
        return parser_ok;
    }

    return parser_display_idx_out_of_range;`,

  pd_ChangesTrieConfiguration_t: `
    // Get all pages first
    uint8_t pages[2];
    CHECK_ERROR(_toStringu32(&v->digest_interval, outValue, outValueLen, 0, &pages[0]))
    CHECK_ERROR(_toStringu32(&v->digest_levels, outValue, outValueLen, 0, &pages[1]))

    *pageCount = pages[0] + pages[1];
    if (pageIdx > *pageCount) {
        return parser_display_idx_out_of_range;
    }

    if (pageIdx < pages[0]) {
        CHECK_ERROR(_toStringu32(&v->digest_interval, outValue, outValueLen, pageIdx, &pages[0]))
        return parser_ok;
    }
    pageIdx -= pages[0];

    if (pageIdx < pages[1]) {
        CHECK_ERROR(_toStringu32(&v->digest_levels, outValue, outValueLen, pageIdx, &pages[1]))
        return parser_ok;
    }

    return parser_display_idx_out_of_range;`,

  pd_Priority_t: `    
    // Get all pages first
    uint8_t pages[2];
    CHECK_ERROR(_toStringu32(&v->stream_id, outValue, outValueLen, 0, &pages[0]))
    CHECK_ERROR(_toStringStreamDependency(&v->dependency, outValue, outValueLen, 0, &pages[1]))

    *pageCount = pages[0] + pages[1];
    if (pageIdx > *pageCount) {
        return parser_display_idx_out_of_range;
    }

    if (pageIdx < pages[0]) {
        CHECK_ERROR(_toStringu32(&v->stream_id, outValue, outValueLen, pageIdx, &pages[0]))
        return parser_ok;
    }
    pageIdx -= pages[0];

    if (pageIdx < pages[1]) {
        CHECK_ERROR(_toStringStreamDependency(&v->dependency, outValue, outValueLen, pageIdx, &pages[1]))
        return parser_ok;
    }

    return parser_display_idx_out_of_range;`,

  pd_TupleIdentityIdbool_t: `
    // Get all pages first
    uint8_t pages[2];
    CHECK_ERROR(_toStringIdentityId(&v->identity, outValue, outValueLen, 0, &pages[0]))
    CHECK_ERROR(_toStringbool(&v->val, outValue, outValueLen, 0, &pages[1]))

    *pageCount = pages[0] + pages[1];
    if (pageIdx > *pageCount) {
        return parser_display_idx_out_of_range;
    }

    if (pageIdx < pages[0]) {
        CHECK_ERROR(_toStringIdentityId(&v->identity, outValue, outValueLen, pageIdx, &pages[0]))
        return parser_ok;
    }
    pageIdx -= pages[0];

    if (pageIdx < pages[1]) {
        CHECK_ERROR(_toStringbool(&v->val, outValue, outValueLen, pageIdx, &pages[1]))
        return parser_ok;
    }

    return parser_display_idx_out_of_range;`,

  pd_MemberCount_t: `
      return _toStringu32(&v->value, outValue, outValueLen, pageIdx, pageCount);`,

  pd_CompactPerBill_t: `
    // 9 but shift 2 to show as percentage
    return _toStringCompactInt(&v->value, 7, '%', "", outValue, outValueLen, pageIdx, pageCount);`,

  pd_Percent_t: `
    // 9 but shift 2 to show as percentage
    return _toStringCompactInt(&v->value, 7, '%', "", outValue, outValueLen, pageIdx, pageCount);`,

  pd_Moment_t: `
    return _toStringu64(&v->value, outValue, outValueLen, pageIdx, pageCount);`,

  pd_Weight_t: `
    return _toStringu64(&v->value, outValue, outValueLen, pageIdx, pageCount);`,

  pd_Gas_t: `
    return _toStringu64(&v->value, outValue, outValueLen, pageIdx, pageCount);`,

  pd_Period_t: `
    return _toStringu64(&v->value, outValue, outValueLen, pageIdx, pageCount);`,

  pd_Proposal_t: `
    return _toStringCall(&v->call, outValue, outValueLen, pageIdx, pageCount);`,

  pd_OpaqueCall_t: `
    return _toStringCall(&v->call, outValue, outValueLen, pageIdx, pageCount);`,

  pd_Call_t: `
    CLEAN_AND_CHECK()
    uint8_t callNumItems = _getMethod_NumItems(*v->_txVerPtr, v->callIndex.moduleIdx, v->callIndex.idx, (pd_Method_t*)v->_methodPtr);

    *pageCount = 1;
    for (uint8_t i = 0; i < callNumItems; i++) {
        uint8_t itemPages = 0;
        _getMethod_ItemValue(*v->_txVerPtr, (pd_Method_t*)v->_methodPtr, v->callIndex.moduleIdx, v->callIndex.idx, i,
            outValue, outValueLen, 0, &itemPages);
        *pageCount += itemPages;
    }

    if (pageIdx == 0) {
        snprintf(outValue, outValueLen, "%s", _getMethod_Name(*v->_txVerPtr, v->callIndex.moduleIdx, v->callIndex.idx));
        return parser_ok;
    }

    pageIdx--;

    if (pageIdx > *pageCount) {
        return parser_display_idx_out_of_range;
    }

    for (uint8_t i = 0; i < callNumItems; i++) {
        uint8_t itemPages = 0;
        _getMethod_ItemValue(*v->_txVerPtr, (pd_Method_t*)v->_methodPtr, v->callIndex.moduleIdx, v->callIndex.idx, i,
                             outValue, outValueLen, 0, &itemPages);

        if (pageIdx < itemPages) {
            uint8_t tmp;
            _getMethod_ItemValue(*v->_txVerPtr, (pd_Method_t*)v->_methodPtr, v->callIndex.moduleIdx, v->callIndex.idx, i,
                outValue, outValueLen, pageIdx, &tmp);
            return parser_ok;
        }

        pageIdx -= itemPages;
    }

    return parser_display_idx_out_of_range;`,

  pd_VecCall_t: `
    CLEAN_AND_CHECK()
    /* count number of pages, then output specific */
    *pageCount = 0;
    uint8_t chunkPageCount;
    uint16_t currentPage, currentTotalPage = 0;
    /* We need to do it twice because there is no memory to keep intermediate results*/
    /* First count*/
    parser_context_t ctx;
    parser_init(&ctx, v->_ptr, v->_lenBuffer);
    parser_tx_t _txObj;
    pd_Call_t _call;
    ctx.tx_obj = &_txObj;
    _txObj.transactionVersion = v->callTxVersion;
    _call._txVerPtr = &v->callTxVersion;

    for (uint16_t i = 0; i < v->_len; i++) {
        pd_Method_t _method;
        CHECK_ERROR(_readCallImpl(&ctx, &_call, &_method));
        CHECK_ERROR(_toStringCall(&_call, outValue, outValueLen, 0, &chunkPageCount));
        (*pageCount)+=chunkPageCount;
    }

    /* Then iterate until we can print the corresponding chunk*/
    parser_init(&ctx, v->_ptr, v->_lenBuffer);
    for (uint16_t i = 0; i < v->_len; i++) {
        pd_Method_t _method;
        CHECK_ERROR(_readCallImpl(&ctx, &_call, &_method));

        chunkPageCount = 1;
        currentPage = 0;
        while (currentPage < chunkPageCount) {
            CHECK_ERROR(_toStringCall(&_call, outValue, outValueLen, currentPage, &chunkPageCount));
            if (currentTotalPage == pageIdx) { return parser_ok; }
            currentPage++;
            currentTotalPage++;
        }
    }

    return parser_print_not_supported;`,

  pd_ElectionSize_t: `
    // Get all pages first
    uint8_t pages[2];
    CHECK_ERROR(_toStringCompactInt(&v->validators, COIN_AMOUNT_DECIMAL_PLACES, 0, "", outValue, outValueLen, 0, &pages[0]))
    CHECK_ERROR(_toStringCompactInt(&v->nominators, COIN_AMOUNT_DECIMAL_PLACES, 0, "", outValue, outValueLen, 0, &pages[1]))

    *pageCount = pages[0] + pages[1];
    if (pageIdx > *pageCount) {
        return parser_display_idx_out_of_range;
    }

    if (pageIdx < pages[0]) {
        CHECK_ERROR(_toStringCompactInt(&v->validators, COIN_AMOUNT_DECIMAL_PLACES, 0, "", outValue, outValueLen, 0, &pages[0]))
        return parser_ok;
    }
    pageIdx -= pages[0];

    if (pageIdx < pages[1]) {
        CHECK_ERROR(_toStringCompactInt(&v->nominators, COIN_AMOUNT_DECIMAL_PLACES, 0, "", outValue, outValueLen, 0, &pages[1]))
        return parser_ok;
    }

    return parser_display_idx_out_of_range;`,

  pd_ValidatorIndex_t: `
    return _toStringu16(&v->value, outValue, outValueLen, pageIdx, pageCount);`,

  pd_u128_t: `
    CLEAN_AND_CHECK()

    char bufferUI[200];
    MEMZERO(outValue, outValueLen);
    MEMZERO(bufferUI, sizeof(bufferUI));
    *pageCount = 1;

    uint8_t bcdOut[100];
    const uint16_t bcdOutLen = sizeof(bcdOut);
    bignumLittleEndian_to_bcd(bcdOut, bcdOutLen, v->_ptr, 16);
    if (!bignumLittleEndian_bcdprint(bufferUI, sizeof(bufferUI), bcdOut, bcdOutLen))
        return parser_unexpected_buffer_end;

    // Format number
    if (intstr_to_fpstr_inplace(bufferUI, sizeof(bufferUI), 0) == 0){
        return parser_unexpected_value;
    }

    pageString(outValue, outValueLen, bufferUI, pageIdx, pageCount);
    
    return parser_ok;`,
}

const SkipTypesCommon = new Set([
  'pd_CompactBalance_t',
  'pd_CallIndex_t',
  'pd_Compactu32_t',
  'pd_Compactu64_t',
  'pd_BlockNumber_t',
  'pd_bool_t',
  'pd_u16_t',
  'pd_u32_t',
  'pd_u64_t',
])

const SkipTypeVersioningCommon = new Set([
  'pd_Call_t',
  'pd_VecCall_t',
  'pd_Proposal_t',
  'pd_bool_t',
  'pd_Bool_t',
  'pd_Bytes_t',
  'pd_Data_t',
  'pd_u16_t',
  'pd_u32_t',
  'pd_u64_t',
  'pd_UInt8_t',
  'pd_UInt16_t',
  'pd_UInt32_t',
  'pd_UInt64_t',
  'pd_u128_t',
  'pd_Hash_t',
  'pd_BlockNumber_t',
  'pd_Compactu64_t',
  'pd_Compactu32_t',
  'pd_Compactu16_t',
  'pd_CompactInt_t',
  'pd_CompactBalance_t',
  'pd_CompactBalanceOf_t',
  'pd_Balance_t',
  'pd_OptionBalance_t',
  'pd_BalanceOf_t',
  'pd_OptionBalanceOf_t',
  'pd_Optionu64_t',
  'pd_Optionu32_t',
  'pd_Optionu16_t',
  'pd_Vecu64_t',
  'pd_Vecu32_t',
  'pd_Vecu16_t',
  'pd_CompactBlockNumber_t',
  'pd_OptionBlockNumber_t',
  'pd_Header_t',
  'pd_VecHeader_t',
  'pd_PubkeyAsAddress_t',
  'pd_VecTupleDataData_t',
  'pd_Optionu8_array_20_t',
  'pd_u8_array_20_t',
  'pd_Heartbeat_t',
  'pd_TupleDataData_t',
  'pd_LookupSource_t',
  'pd_VecLookupSource_t',
])

const SkipMethodsCommon = new Set([
  // Will not support. Too much data
  'system.setStorage',
  'system.killStorage',
  'system.setChangesTrieConfig',
  'system.killPrefix',
  'authorship.setUncles',
  'imOnline.heartbeat',
  'parachains.setHeads',
  'attestations.moreAttestations',
  'registrar.registerPara',
  'registrar.registerParathread',
  'slots.fixDeployData',
  'slots.elaborateDeployData',

  'grandpa.reportEquivocation',

  'scheduler.schedule',
  'scheduler.cancel',
  'scheduler.scheduleNamed',
  'scheduler.cancelNamed',

  // Investigate
  'utility.asSub',
  'utility.asMulti',
  'utility.approveAsMulti',
  'utility.cancelAsMulti',
  'utility.asLimitedSub',
  'electionsPhragmen.reportDefunctVoter',
  'electionsPhragmen.renounceCandidacy',

  // Not supported yet
  'babe.reportEquivocation',
  'babe.reportEquivocationUnsigned',
  'grandpa.reportEquivocationUnsigned',

  'identity.setSubs',
  'identity.addSub',
  'identity.renameSub',
  'identity.setFields',
  'identity.setIdentity', // << DO this
  'identity.provideJudgement',
  'society.judgeSuspendedCandidate',
  'recovery.asRecovered',
  'recovery.createRecovery',

  'parachains.reportDoubleVote',
  'parachains.transferToParachain',
  'parachains.sendXcmpMessage',

  'utility.asDerivative',
  'staking.submitElectionSolution',
  'staking.submitElectionSolutionUnsigned',
  'staking.scaleValidatorCount',

  'scheduler.scheduleAfter',
  'scheduler.scheduleNamedAfter',
  'purchase.updateValidityStatus',
  'purchase.updateBalance',

  'claims.mintClaim',
  'poll.vote',

  'democracy.blacklist',

  'treasury.claimBounty',
  'treasury.closeBounty',
  'treasury.extendBountyExpiry',
])

module.exports = {
  PrebuiltCommonTypes,
  PrebuiltCommonReads,
  PrebuiltCommonToString,
  SkipTypesCommon,
  SkipMethodsCommon,
  SkipTypeVersioningCommon,
}
