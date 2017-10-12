<!-- Delete Modal -->
<div class="modal fade" id="{{ (isset($id) ? $id : 'delete-modal') }}" tabindex="-1" role="dialog" aria-labelledby="Delete" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h5 class="modal-title" id="delete-modal-title">Delete Confirm</h5>
            </div>
            <div class="modal-body">
                <div id="delete-modal-message"></div>
                <input type="hidden" id="delete-modal-ids">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-danger" id="delete-modal-confirmed">Delete</button>
            </div>
        </div>
    </div>
</div>
