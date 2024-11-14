 

/*
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: Apache-2.0
 *
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SearchField = { field: string; type?: any; error?: string };

// Below types were auto generated by https://app.quicktype.io/
export interface Compiled {
    resourceType: string;
    path: string;
    condition?: string[];
}

export enum SearchParamType {
    Date = 'date',
    Number = 'number',
    Quantity = 'quantity',
    Reference = 'reference',
    String = 'string',
    Token = 'token',
    URI = 'uri',
}

export interface CompiledSearchParameter {
    name: string;
    url: string;
    type: SearchParamType;
    description: string;
    base: string;
    compiled: Compiled[];
    target?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace FhirProfiles {
    export interface Profiles {
        resourceType: string;
        id: string;
        meta: Meta;
        type: string;
        entry: Entry[];
    }

    export interface Entry {
        fullUrl: string;
        resource: Resource;
    }

    export interface Resource {
        resourceType: ResourceType;
        id: string;
        meta: Meta;
        text: Text;
        extension: ResourceExtension[];
        url: string;
        version: Version;
        name: string;
        status: ResourceStatus;
        date: Date;
        publisher: Publisher;
        contact: Contact[];
        description: string;
        fhirVersion: Version;
        mapping?: ResourceMapping[];
        kind: Kind;
        abstract: boolean;
        type: string;
        snapshot: Snapshot;
        differential: Differential;
        baseDefinition?: string;
        derivation?: Derivation;
        purpose?: string;
    }

    export interface Contact {
        telecom: Telecom[];
    }

    export interface Telecom {
        system: System;
        value: string;
    }

    export enum System {
        URL = 'url',
    }

    export enum Derivation {
        Constraint = 'constraint',
        Specialization = 'specialization',
    }

    export interface Differential {
        element: DifferentialElement[];
    }

    export interface DifferentialElement {
        id: string;
        extension?: BindingExtension[];
        path: string;
        short?: string;
        definition?: string;
        min?: number;
        max: string;
        condition?: string[];
        constraint?: Constraint[];
        mapping?: ElementMapping[];
        representation?: Representation[];
        type?: TypeElement[];
        slicing?: Slicing;
        comment?: string;
        alias?: string[];
        requirements?: string;
        isModifier?: boolean;
        isModifierReason?: string;
        isSummary?: boolean;
        minValueInteger?: number;
        maxValueInteger?: number;
        maxLength?: number;
        example?: Example[];
        binding?: Binding;
        orderMeaning?: string;
        meaningWhenMissing?: string;
    }

    export interface Binding {
        extension: BindingExtension[];
        strength: Strength;
        description?: string;
        valueSet: string;
    }

    export interface BindingExtension {
        url: string;
        valueString?: string;
        valueCanonical?: string;
        valueBoolean?: boolean;
        valueCode?: ValueCode;
    }

    export enum ValueCode {
        Draft = 'draft',
        Normative = 'normative',
        The400 = '4.0.0',
        TrialUse = 'trial-use',
    }

    export enum Strength {
        Example = 'example',
        Extensible = 'extensible',
        Preferred = 'preferred',
        Required = 'required',
    }

    export interface Constraint {
        key: string;
        severity: Severity;
        human: string;
        expression: string;
        xpath: string;
        source?: string;
    }

    export enum Severity {
        Error = 'error',
        Warning = 'warning',
    }

    export interface Example {
        label: Label;
        valueCode?: string;
        valueString?: string;
        valuePeriod?: ValuePeriod;
        valueUrl?: string;
        valueUri?: string;
    }

    export enum Label {
        General = 'General',
    }

    export interface ValuePeriod {
        start: Date;
        end: Date;
    }

    export interface ElementMapping {
        identity: Identity;
        map: string;
    }

    export enum Identity {
        Dex = 'dex',
        Iso11179 = 'iso11179',
        Loinc = 'loinc',
        Orim = 'orim',
        Rim = 'rim',
        Servd = 'servd',
        V2 = 'v2',
        Vcard = 'vcard',
    }

    export enum Representation {
        XHTML = 'xhtml',
        XMLAttr = 'xmlAttr',
    }

    export interface Slicing {
        discriminator: Discriminator[];
        description: Description;
        rules: Rules;
    }

    export enum Description {
        ExtensionsAreAlwaysSlicedByAtLeastURL = 'Extensions are always sliced by (at least) url',
    }

    export interface Discriminator {
        type: TypeEnum;
        path: System;
    }

    export enum TypeEnum {
        Value = 'value',
    }

    export enum Rules {
        Open = 'open',
    }

    export interface TypeElement {
        extension?: TypeExtension[];
        code: string;
        targetProfile?: string[];
        profile?: string[];
    }

    export interface TypeExtension {
        url: string;
        valueUrl?: string;
        valueString?: string;
    }

    export interface ResourceExtension {
        url: string;
        valueCode: ValueCode;
    }

    export enum Version {
        The401 = '4.0.1',
    }

    export enum Kind {
        ComplexType = 'complex-type',
        PrimitiveType = 'primitive-type',
    }

    export interface ResourceMapping {
        identity: Identity;
        uri: string;
        name: Name;
    }

    export enum Name {
        HL7V2Mapping = 'HL7 v2 Mapping',
        IHEDataElementExchangeDEX = 'IHE Data Element Exchange (DEX)',
        ISO11179 = 'ISO 11179',
        LOINCCodeForTheElement = 'LOINC code for the element',
        OntologicalRIMMapping = 'Ontological RIM Mapping',
        RIMMapping = 'RIM Mapping',
        ServD = 'ServD',
        VCardMapping = 'vCard Mapping',
    }

    export interface Meta {
        lastUpdated: Date;
    }

    export enum Publisher {
        HL7FHIRStandard = 'HL7 FHIR Standard',
    }

    export enum ResourceType {
        StructureDefinition = 'StructureDefinition',
    }

    export interface Snapshot {
        element: SnapshotElement[];
    }

    export interface SnapshotElement {
        id: string;
        extension?: BindingExtension[];
        path: string;
        short: string;
        definition: string;
        min: number;
        max: string;
        base: Base;
        condition?: string[];
        constraint?: Constraint[];
        isModifier: boolean;
        mapping?: ElementMapping[];
        representation?: Representation[];
        type?: TypeElement[];
        isSummary?: boolean;
        slicing?: Slicing;
        comment?: string;
        alias?: string[];
        requirements?: string;
        isModifierReason?: string;
        minValueInteger?: number;
        maxValueInteger?: number;
        maxLength?: number;
        example?: Example[];
        binding?: Binding;
        orderMeaning?: string;
        meaningWhenMissing?: string;
    }

    export interface Base {
        path: string;
        min: number;
        max: string;
    }

    export enum ResourceStatus {
        Active = 'active',
        Draft = 'draft',
    }

    export interface Text {
        status: TextStatus;
        div: string;
    }

    export enum TextStatus {
        Generated = 'generated',
    }
}
