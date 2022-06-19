import * as Y from '@gaoding/yjs';
import type { IVPEditor, ILayoutModel, IGroupElementModel, ElementModel, VPEAction, UID, ITempletModel } from '../../types/editor';
import type { YElement, YGlobal, YLayout, YUrlMap, YTemplet, YActionLogs } from '../../types/y';
export declare function logVPEAction(...args: unknown[]): void;
export declare class YBinding {
    doc: Y.Doc;
    editor: IVPEditor;
    undoMgr: Y.UndoManager;
    yTemplet: YTemplet;
    yUrlMap: YUrlMap;
    yActionLogs: YActionLogs;
    config: {
        transactable: boolean;
        acceptElementAction: boolean;
        applyingYActions: boolean;
    };
    private _isRemoteUpdating;
    constructor(editor: IVPEditor, doc: Y.Doc | null);
    get yLayoutMap(): Y.Map<YLayout>;
    get yElementMap(): Y.Map<YElement>;
    get yGlobal(): YGlobal;
    getYLayout(layout: ILayoutModel): YLayout;
    getYElement(element: ElementModel): YElement;
    getParentById(parentId: UID, layouts?: ILayoutModel[]): IGroupElementModel | ILayoutModel;
    serializeElement(id: UID, deep?: boolean): ElementModel;
    serializeLayout(id: UID): ILayoutModel;
    serializeTemplet(): Omit<ITempletModel, 'version'>;
    private _addLayout;
    private _changeLayout;
    private _removeLayout;
    private _swapLayout;
    private _createElement;
    private _addElement;
    private _changeElement;
    private _removeElements;
    private _reorderElement;
    private _addGroup;
    private _flatGroup;
    private _cancelTempGroup;
    private _changeGlobal;
    private _pushLog;
    private _getChildren;
    private _getLeftRightKeys;
    private _report;
    private _updateKeysBetween;
    private _updateIndex;
    /** 获得元素的 fractional index */
    private _getFIndex;
    /** 换算 fractional indexing 字段为数组 index */
    convertFIndex(yModel: YLayout | YElement, baseSiblings: (ILayoutModel | ElementModel)[]): number;
    private _reorder;
    private _validate;
    private _beforeSyncYModel;
    beforeUpdateEditorModel(props: ElementModel | ILayoutModel): void;
    private _setTemplet;
    private _remoteObserver;
    private _commitAction;
    commit(action: VPEAction, sync: boolean): void;
    private _clearYTemplet;
    destroy(): void;
}